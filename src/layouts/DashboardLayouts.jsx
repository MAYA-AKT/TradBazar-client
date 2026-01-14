import React from 'react';
import Sidebar from '../components/dashboard/sidebar/Sidebar';
import { Outlet } from 'react-router';

const DashboardLayouts = () => {
    return (
        <div className='relative min-h-screen md:flex bg-white'>
            
            <Sidebar />
           
            <div className='flex-1  md:ml-64'>
                <div className='p-5'>
                   
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayouts;