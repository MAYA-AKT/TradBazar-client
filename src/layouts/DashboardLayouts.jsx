import React from 'react';
import Sidebar from '../components/dashboard/sidebar/Sidebar';
import { Outlet } from 'react-router';

const DashboardLayouts = () => {
    return (
        <div className="relative min-h-screen bg-white">
            <Sidebar />

            <main className="md:ml-70 p-4 bg-base-200 ">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayouts;