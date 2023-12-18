import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { connect, disconnect } from "@/util/database";
import Participant from "@/db/participant";

export default async function FetchUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, 'secret');
            const userId = decoded.id;

            await connect();
            const user = await Participant.findById(userId).populate('batch');
            await disconnect();

            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const { name, age, email, gender, batch } = user;
            res.status(200).json({ name, age, email, gender, batch });
        } catch (err: any) {
            console.error(err);
            await disconnect();
            res.status(500).json({ message: 'Fetch user failed', error: err.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
