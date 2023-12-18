import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Success = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/dashboard/your-class');
        }, 5000);

        // Cleanup function to clear the timeout if the component unmounts before the timeout finishes
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-8">Payment Successful</h1>
            <p className="mb-4">You will be redirected to the dashboard in a few seconds...</p>
        </div>
    );
};

export default Success;
