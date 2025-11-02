import React from 'react';
import Slider from '../components/slider/Slider';
import Category from '../components/dashboard/userdashboard/Category';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div>
                <Slider />
            </div>
            <div>
                <Category/>
            </div>
        </div>
    );
};

export default Home;