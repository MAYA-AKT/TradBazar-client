import React from 'react';
import Slider from '../components/slider/Slider';
import Category from '../components/dashboard/userdashboard/Category';
import TopProducts from '../components/dashboard/userdashboard/topProducts/TopProducts';

const Home = () => {
    return (
        <div className='bg-gray-100'>
            <div className='max-w-7xl mx-auto '>
                <div className='mt-2' >
                    <Slider />
                </div>
                <div >
                    <Category />
                </div>
                <div>
                    <TopProducts />
                </div>
            </div>
            <div>Footer</div>
        </div>
    );
};

export default Home;