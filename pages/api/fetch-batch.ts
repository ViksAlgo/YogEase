import { NextApiRequest, NextApiResponse } from 'next';
import { connect, disconnect } from "@/util/database";
import Batch from "@/db/batch";

export default async function FetchBatch(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { id } = req.query;

        try {
            await connect();
            const batch = await Batch.findById(id);
            await disconnect();

            if (!batch) {
                return res.status(404).json({ message: 'Batch not found' });
            }

            res.status(200).json({ message: 'Batch fetched successfully', batch });
        } catch (err: any) {
            console.error(err);
            await disconnect();
            res.status(500).json({ message: 'Batch fetch failed', error: err.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
