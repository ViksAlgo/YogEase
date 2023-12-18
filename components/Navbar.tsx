import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.png'; // replace with your logo path
import profilePic from '../public/profile.png'; // replace with your profile picture path
import {useRouter} from "next/router";

const NavBar = () => {
    const router = useRouter();
    const handleLogout = () => {
        // Add your logout logic here
        localStorage.removeItem('token');
        localStorage.removeItem('userDetails');
        router.replace('/login');
    };

    return (
        <nav className="flex justify-between items-center p-6 bg-blue-400">
            <div className="flex items-center">
                {/*<Image src={logo} alt="YogEase Logo" width={50} height={50} />*/}
                <h1 className="ml-3 text-2xl font-bold">YogEase</h1>
            </div>
            <div className="flex space-x-4 items-center">
                <Link href="your-class">
                    <h1 className={`text-lg cursor-pointer p-2 rounded-lg ${router.pathname === '/dashboard/your-class' ? 'bg-white text-black' : ''} `}>
                        Your Class
                    </h1>
                </Link>
                <Link href="transaction-history">
                    <h1 className={`text-lg cursor-pointer p-2 rounded-lg ${router.pathname === '/dashboard/transaction-history' ? 'bg-white text-black' : ''} `}>
                        Transaction History
                    </h1>
                </Link>
                <Link href="about">
                    <h1 className={`text-lg cursor-pointer p-2 rounded-lg ${router.pathname === '/dashboard/about' ? 'bg-white text-black' : ''} `}>
                        About
                    </h1>
                </Link>
            </div>
            <div className="flex items-center space-x-3">
                {/*<Image src={profilePic} alt="Profile Picture" width={40} height={40} className="rounded-full" />*/}
                <button onClick={handleLogout} className="text-lg">Logout</button>
            </div>
        </nav>
    );
};

export default NavBar;
