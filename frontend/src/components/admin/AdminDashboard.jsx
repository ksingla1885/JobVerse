import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';

const AdminDashboard = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animations after component mounts
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`min-h-screen bg-gray-50 transition-all duration-800 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Navbar />
            <div className={`max-w-7xl mx-auto my-10 p-5 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <main className={`transition-all duration-600 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
