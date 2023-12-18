import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Payment = () => {
    const router = useRouter();
    const [batch, setBatch] = useState(null);
    const [laoding, setLoading] = useState(false);
    const [form, setForm] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBatch = async () => {
            setLoading(true);
            const response = await fetch(`/api/fetch-batch?id=${router.query.batchId}`);
            const data = await response.json();
            setBatch(data.batch);
            setLoading(false);
        };

        if (router.query.batchId) {
            fetchBatch();
        }
    }, [router.query.batchId]);

    const handlePayment = async (e) => {
        e.preventDefault();
        if (form.cardNumber.length < 19) {
            setError('Invalid Card Number');
            return;
        }
        if (form.expiryDate.length < 5) {
            setError('Invalid Expiry Date');
            return;
        }
        if (form.cvv.length < 3) {
            setError('Invalid CVV');
            return;
        }
        setError('');

        // Here you can handle the payment.
        // For example, you can send a request to your payment gateway with the card details.

        try {
            const response = await fetch('/api/complete-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    batchId: router.query.batchId,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // Redirect to success page
            router.push('/success');
        } catch (error) {
            setError(error.message);
        }
    };

    const expiryDateFormatter = (value) => {
        const input = value.replace(/\D/g, '').substring(0, 4);
        const parts = [];

        for (let i = 0, len = input.length; i < len; i += 2) {
            parts.push(input.substring(i, i + 2));
        }
        if (parts[0] && parts[0] > 12) {
            parts[0] = '12';
        }
        if (parts[1] && parts[1] > 99) {
            parts[1] = '99';
        }
        setForm({ ...form, expiryDate: parts.join('/') });

        return parts.join('/');
    }

    const CVVFormatter = (value) => {
        setForm({ ...form, cvv: value.replace(/\D/g, '').substring(0, 3) });
        return value.replace(/\D/g, '').substring(0, 3);
    }

    const CardNumberFormatter = (value) => {
        setForm({ ...form, cardNumber: value.replace(/\D/g, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim() });
        return value.replace(/\D/g, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim();
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-8">Payment</h1>
            {batch ? (
                <>
                    <p className="mb-4">You are enrolling in: {batch.name}</p>
                    <p className="mb-4">Timeslot: {batch.timeSlot}</p>
                    <form onSubmit={handlePayment} className="w-1/2">
                        <input
                            type="text"
                            name="cardNumber"
                            onChange={(e) => {
                                e.target.value = CardNumberFormatter(e.target.value);
                            }}
                            placeholder="Card Number"
                            className="block w-full mb-4 p-2 border border-gray-300 rounded text-black"
                        />
                        <input
                            type="text"
                            name="expiryDate"
                            onChange={(e) => {
                                e.target.value = expiryDateFormatter(e.target.value);
                            }}
                            placeholder="Expiry Date (MM/YY)"
                            className="block w-full mb-4 p-2 border border-gray-300 rounded text-black"
                        />
                        <input
                            type="number"
                            name="cvv"
                            onChange={(e) => {
                                e.target.value = CVVFormatter(e.target.value);
                            }}
                            placeholder="CVV"
                            className="block w-full mb-4 p-2 border border-gray-300 rounded text-black"
                        />
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <button type="submit" className="block w-full p-2 bg-blue-600 text-white rounded">
                            Pay Now
                        </button>
                    </form>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Payment;
