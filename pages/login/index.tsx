import React, { useState } from 'react';
import Link from 'next/link';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Make a POST request to the /api/login endpoint with the form data
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const data = await response.json();

        if (response.ok) {
            // Login was successful
            // Store the token in localStorage
            const fetchUserDetails = await fetch('/api/fetch-user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + data.token,
                },
            });
            const userDetails = await fetchUserDetails.json();
            console.log(userDetails);
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            if (userDetails.batch) {
                window.location.href = '/dashboard/your-class';
            } else {
                window.location.href = '/batch';
            }
            localStorage.setItem('token', data.token);
            setLoading(false);
            // You can redirect the user to the home page
            // For now, let's just log the success message
            console.log(data.message);
        } else {
            // Login failed
            // Display the error message
            setError(data.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-8">Login to YogEase</h1>
            <form onSubmit={handleSubmit} className="w-1/2">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded text-black"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded text-black"
                />
                {error && <p className="text-red-500">{error}</p>}
                <p className="mb-4">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-600">
                        Register here.
                    </Link>
                </p>
                <button type="submit" className="block w-full p-2 bg-blue-600 text-white rounded">
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
