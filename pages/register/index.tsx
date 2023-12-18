'use client';

import React, { useState } from 'react';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        age: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (Number(form.age) < 18 || Number(form.age) > 65) {
            setError('Age must be between 18 and 65.');
            return;
        }

        if (form.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Make a POST request to the /api/register endpoint with the form data
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const data = await response.json();
        localStorage.setItem('token', data.token);

        if (response.ok) {
            // Registration was successful
            // You can redirect the user to the login page or to the home page
            // For now, let's just log the success message
            console.log(data.message);
        } else {
            // Registration failed
            // Display the error message
            setError(data.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-8">Register for YogEase</h1>
            <form onSubmit={handleSubmit} className="w-1/2">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded text-black"
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded text-black"
                />
                <select
                    name="gender"
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded text-black"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
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
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded text-black"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="block w-full p-2 bg-blue-600 text-white rounded">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
