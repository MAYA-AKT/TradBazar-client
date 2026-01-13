import React from 'react';
import Slider from '../components/slider/Slider';
import Category from '../components/dashboard/userdashboard/Category';
import TopProducts from '../components/dashboard/userdashboard/topProducts/TopProducts';
import ChooseUs from '../components/dashboard/userdashboard/chooseUs/ChooseUs';
import Footer from '../components/dashboard/userdashboard/footer/Footer';

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
                <div>
                    <ChooseUs/>
                </div>
            </div>
            
        </div>
    );
};

export default Home;