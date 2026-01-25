import React from 'react';
import Sidebar from '../components/dashboard/sidebar/Sidebar';
import { Outlet } from 'react-router';
import ProfileDropdown from '../shared/profile/ProfileDropdown';
import useAuth from '../hooks/useAuth';
import NotificationDropdown from '../pages/notification/NotificationDropdown';

const DashboardLayouts = () => {
    const { user } = useAuth();
    return (
        <div className="relative min-h-screen ">
            <Sidebar />

            <main className="md:ml-70 p-4 bg-base-100">
                <div className='flex justify-end items-center mr-8 space-x-2'>
                    <ProfileDropdown />
                    <div className='text-green-600 '>
                        <NotificationDropdown userEmail={user?.email} />
                    </div>
                </div>
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayouts;