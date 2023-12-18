import { NextApiRequest, NextApiResponse } from 'next';
import { connect, disconnect } from "@/util/database";
import Batch from "@/db/batch";

export default async function CreateBatch(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, timeSlot, price } = req.body;


        try {
            await connect();
            const batch = new Batch({ name, timeSlot, price });
            await batch.save();
            await disconnect();

            res.status(200).json({ message: 'Batch creation successful' });
        } catch (err: any) {
            console.error(err);
            await disconnect();
            res.status(500).json({ message: 'Batch creation failed', error: err.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
