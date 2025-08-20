import React from 'react';
import { Outlet } from 'react-router';
import Header from '../shared/header/Header';
import Navbar from '../shared/header/Navbar';
import Slider from '../components/slider/Slider';
import Footer from '../shared/footer/Footer';


const RootLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />

        </div>
    );
};

export default RootLayout;