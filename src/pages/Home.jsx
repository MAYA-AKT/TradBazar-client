import React from 'react';
import Slider from '../components/slider/Slider';
import Category from '../components/dashboard/userdashboard/Category';
import TopProducts from '../components/dashboard/userdashboard/topProducts/TopProducts';
import ChooseUs from '../components/dashboard/userdashboard/chooseUs/ChooseUs';
import TopSellingProducts from '../components/dashboard/userdashboard/topSellingProduct/TopSellingProducts';
import CategoryBadge from '../components/dashboard/userdashboard/categoryBadge/CategoryBadge';



const Home = () => {
    return (
        <div className=''>
         <CategoryBadge/>
            <div className='max-w-7xl mx-auto '>
             
                <div className='mt-2' >
                    <Slider />
                </div>
                <div >
                    <Category />
                </div>
                <div>
                    <TopSellingProducts />
                </div>
                <div>
                    <TopProducts />
                </div>
                <div>
                    <ChooseUs />
                </div>
            </div>

        </div>
    );
};

export default Home;