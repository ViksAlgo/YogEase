import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import {router} from "next/client";

const Dashboard = () => {
    useEffect(() => {
        router.push('/dashboard/your-class');
    }, []);

    return (
        <div>
            <Navbar />
        </div>
    );
};


export default Dashboard;
