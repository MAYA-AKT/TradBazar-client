import React from 'react';
import Header from '../../../shared/header/Header';
import { Outlet } from 'react-router';

const UserDashboard = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default UserDashboard;