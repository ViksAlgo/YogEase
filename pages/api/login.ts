import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connect, disconnect } from "@/util/database";
import Participant from "@/db/participant";

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            await connect();
            const participant = await Participant.findOne({ email });

            if (!participant) {
                await disconnect();
                return res.status(400).json({ message: 'Invalid email or password.' });
            }

            const isMatch = await bcrypt.compare(password, participant.password);

            if (!isMatch) {
                await disconnect();
                return res.status(400).json({ message: 'Invalid email or password.' });
            }

            // Generate a token for the logged in user
            const token = jwt.sign({ id: participant._id }, 'secret');

            await disconnect();

            res.status(200).json({ message: 'Login successful', token });
        } catch (err: any) {
            console.error(err);
            await disconnect();
            res.status(500).json({ message: 'Login failed', error: err.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
