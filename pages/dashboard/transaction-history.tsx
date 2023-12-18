import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            const response = await fetch('/api/fetch-transaction-history', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            const data = await response.json();

            if (response.ok) {
                setTransactions(data.payments);
                setLoading(false);
            } else {
                console.error(data.message);
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="bg-black min-h-screen">
            <Navbar/>
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold mb-8">Transaction History</h1>
                {loading ? (
                    <p className="text-lg text-gray-500">Loading...</p>
                ) : transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                        <div key={index} className="bg-white shadow rounded-lg p-6 mb-6">
                            <h2 className="text-2xl text-black font-bold mb-4">Transaction {index + 1}</h2>
                            <p className="text-lg text-gray-600">Batch Name: {transaction.batch.name}</p>
                            <p className="text-lg text-gray-600">Amount: {transaction.amount}</p>
                            <p className="text-lg text-gray-600">Date: {new Date(transaction.paymentDate).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-lg text-gray-500">No transactions found.</p>
                )}
            </div>
        </div>
)
    ;
};

export default TransactionHistory;
