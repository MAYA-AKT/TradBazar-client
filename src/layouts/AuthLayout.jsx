import React from 'react';
import { Outlet } from 'react-router';
import Header from '../shared/header/Header';

const AuthLayout = () => {
    return (
        <div> 
            <Header/>
            <Outlet/>
        </div>
    );
};

export default AuthLayout;