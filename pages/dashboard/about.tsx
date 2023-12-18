import React from 'react';
import Navbar from "@/components/Navbar";

const About = () => {
    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold mb-8">About YogEase</h1>
                <p className="text-lg text-gray-100 mb-8">
                    YogEase is a platform that connects yoga enthusiasts with professional instructors.
                    We offer a variety of classes that cater to all levels, from beginners to advanced practitioners.
                    Our mission is to make yoga accessible and enjoyable for everyone.
                </p>
                <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white shadow rounded-lg p-6">
                        <p className="text-lg text-gray-600 mb-4">&quot;YogEase has changed my life. The instructors are top-notch and the community is incredibly supportive.&quot;</p>
                        <p className="text-lg text-black font-bold">- Harshit Suneja</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-6">
                        <p className="text-lg text-gray-600 mb-4">&quot;I love the variety of classes offered. There&apos;s something for everyone at YogEase.&quot;</p>
                        <p className="text-lg text-black font-bold">- Vykas</p>
                    </div>
                </div>
                <h2 className="text-3xl font-bold mb-4 mt-8">Follow Us</h2>
                <div className="flex space-x-4">
                    <a href="https://www.facebook.com/yogease" className="text-blue-600 text-2xl"><i className="fab fa-facebook-square"></i></a>
                    <a href="https://www.twitter.com/yogease" className="text-blue-400 text-2xl"><i className="fab fa-twitter-square"></i></a>
                    <a href="https://www.instagram.com/yogease" className="text-pink-600 text-2xl"><i className="fab fa-instagram-square"></i></a>
                </div>
            </div>
        </div>
    );
};

export default About;
