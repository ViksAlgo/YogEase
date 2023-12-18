import { NextApiRequest, NextApiResponse } from 'next';
import { connect, disconnect } from "@/util/database";
import jwt from 'jsonwebtoken';
import Payment from "@/db/payment";
import Batch from "@/db/batch";
import Participant from "@/db/participant";

export default async function CompletePayment(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const token = req.headers.authorization?.split(' ')[1];
        const batchId = req.body.batchId;

        if (!token) {
            return res.status(401).json({ message: 'No token provided.' });
        }

        try {
            const decoded = jwt.verify(token as string, 'secret');
            const userId = decoded.id;

            await connect();

            const batch = await Batch.findById(batchId);
            if (!batch) {
                await disconnect();
                return res.status(404).json({ message: 'Batch not found.' });
            }

            const payment = new Payment({
                participant: userId,
                batch: batchId,
                amount: batch.price,
            });

            await payment.save();

            // enroll the participant in the batch
            const participant = await Participant.findById(userId);
            if (!participant) {
                await disconnect();
                return res.status(404).json({ message: 'Participant not found.' });
            }
            participant.batch = batchId;
            await participant.save();

            await disconnect();

            res.status(200).json({ message: 'Payment successful' });
        } catch (err: any) {
            console.error(err);
            await disconnect();
            res.status(500).json({ message: 'Payment failed', error: err.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
