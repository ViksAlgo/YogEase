import React, { useEffect, useState } from 'react';
import Link from "next/link";

const Batches = () => {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('/api/fetch-batches')
            .then(response => response.json())
            .then(data => {
                setBatches(data.batches);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-8">Available Batches</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                batches.map((batch) => (
                    <div key={batch._id} className="flex flex-col items-center justify-center mb-4 p-4 border border-gray-300 rounded">
                        <h2 className="text-2xl font-bold mb-2">{batch.name}</h2>
                        <p className="mb-2">Timing: {batch.timeSlot}</p>
                        <p className="mb-2">Price: {batch.price}</p>
                        <Link href={`/payment?batchId=${batch._id}`}>
                            <button className="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700">
                                Enroll
                            </button>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default Batches;
