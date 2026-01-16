import React from 'react';
import Header from '../../../shared/header/Header';
import { Outlet } from 'react-router';
import Footer from './footer/Footer';

const UserDashboard = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-gray-100">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default UserDashboard;