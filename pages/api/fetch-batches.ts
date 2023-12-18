import { NextApiRequest, NextApiResponse } from 'next';
import { connect, disconnect } from "@/util/database";
import Batch from "@/db/batch";

export default async function FetchBatches(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connect();
        const batches = await Batch.find({});
        await disconnect();

        res.status(200).json({ message: 'Batches fetched successfully', batches });
    } catch (err: any) {
        console.error(err);
        await disconnect();
        res.status(500).json({ message: 'Batches fetch failed', error: err.message });
    }
}
