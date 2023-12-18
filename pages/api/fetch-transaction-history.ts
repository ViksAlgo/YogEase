import { NextApiRequest, NextApiResponse } from 'next';
import { connect, disconnect } from "@/util/database";
import Payment from "@/db/payment";
import jwt from 'jsonwebtoken';

export default async function FetchTransactionHistory(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const decodedToken = jwt.verify(token, 'secret');
            if (!decodedToken) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const userId = decodedToken.id;
            await connect();
            const payments = await Payment.find({ participant: userId }).populate('batch');
            await disconnect();

            res.status(200).json({ message: 'Transaction history fetch successful', payments });
        } catch (err: any) {
            console.error(err);
            await disconnect();
            res.status(500).json({ message: 'Transaction history fetch failed', error: err.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
