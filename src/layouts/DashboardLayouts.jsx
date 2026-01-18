import React from 'react';
import Sidebar from '../components/dashboard/sidebar/Sidebar';
import { Outlet } from 'react-router';
import ProfileDropdown from '../shared/profile/ProfileDropdown';
import useAuth from '../hooks/useAuth';
import NotificationDropdown from '../pages/notification/NotificationDropdown';

const DashboardLayouts = () => {
    const {user} = useAuth();
    return (
        <div className="relative min-h-screen bg-white">
            <Sidebar />

            <main className="md:ml-70 p-4 bg-base-200 h-screen">
                <div className='flex justify-end items-center mr-8 space-x-2'>
                    <ProfileDropdown/>
                    <NotificationDropdown userEmail={user?.email} />
                </div>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayouts;