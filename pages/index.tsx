import React from 'react';
import Link from 'next/link';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-6xl font-bold">
                    Welcome to <span className="text-blue-600">YogEase</span>
                </h1>

                <p className="mt-3 text-2xl">
                    Join our online yoga classes and find your inner peace.
                </p>

                <div className="flex mt-6">
                    <Link href="/register" className="px-5 py-3 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Get Started
                    </Link>
                    <Link href="/login" className="px-5 py-3 font-bold text-white border-2 border-blue-600 ml-5 rounded hover:bg-blue-700"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
