import React from 'react';
import { Outlet } from 'react-router';
import Header from '../shared/header/Header';
import Footer from '../components/dashboard/userdashboard/footer/Footer';

const AuthLayout = () => {
    return (
        <div> 
           <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-gray-100">
                <Outlet />
            </main>
            <Footer />
        </div>
        </div>
    );
};

export default AuthLayout;