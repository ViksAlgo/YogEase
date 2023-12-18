import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connect, disconnect } from "@/util/database";
import Participant from "@/db/participant";

export default async function Register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, age, gender, email, password, confirmPassword } = req.body;

        // Validate the age
        if (age < 18 || age > 65) {
            return res.status(400).json({ message: 'Age must be between 18 and 65.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        // Validate the passwords
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await connect();
            const participant = new Participant({ name, age, gender, email, password: hashedPassword });
            await participant.save();
            await disconnect();

            // Generate a token for the new participant
            const token = jwt.sign({ id: participant._id }, 'secret');

            res.status(200).json({ message: 'Registration successful', token });
        } catch (err: any) {
            console.error(err);
            await disconnect();
            res.status(500).json({ message: 'Registration failed', error: err.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
