import React from 'react';
import Header from '../../../shared/header/Header';
import { Outlet } from 'react-router';
import Footer from './footer/Footer';

const UserDashboard = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default UserDashboard;