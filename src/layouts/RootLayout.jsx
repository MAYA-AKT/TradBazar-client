import React from 'react';
import { Outlet } from 'react-router';
import Header from '../shared/header/Header';
import UserDashboard from '../components/dashboard/userdashboard/UserDashboard';
import { FaWhatsapp } from "react-icons/fa";


const RootLayout = () => {
    return (
        <div>


            <UserDashboard />

            <div>
                <a
                    href="https://wa.me/01407533436"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition"
                >
                    <FaWhatsapp size={22} />
                    <span className="hidden md:inline text-sm font-medium">
                        Chat on WhatsApp
                    </span>
                </a>
            </div>

        </div>
    );
};

export default RootLayout;