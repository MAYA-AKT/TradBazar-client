import React from 'react';
import { Outlet } from 'react-router';
import Header from '../shared/header/Header';
import UserDashboard from '../components/dashboard/userdashboard/UserDashboard';



const RootLayout = () => {
    return (
        <div>
       
        
           <UserDashboard/>
           
       

        </div>
    );
};

export default RootLayout;