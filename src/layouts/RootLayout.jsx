import React from 'react';
import { Outlet } from 'react-router';
import Header from '../shared/header/Header';
import UserDashboard from '../components/dashboard/userdashboard/UserDashboard';



const RootLayout = () => {
    return (
        <div>
       
        {/* Users/Buyers Dashboard */}
           <UserDashboard/>
        {/* Seller dashboard
        
        
        */}

         {/* Admin dashboard 
         
         
        */}

        </div>
    );
};

export default RootLayout;