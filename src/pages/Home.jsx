import React from 'react';
import Navbar from '../shared/header/Navbar';
import Slider from '../components/slider/Slider';
import Searchbar from '../shared/Searchbar';
import CategoryList from '../components/category/CategoryList';

const Home = () => {
    return (
        <div>
            <main className=' w-11/12 md:w-10/12 mx-auto'>
                <div className=" md:grid grid-cols-12 gap-4 my-5">
                    <div className=" col-span-2 shadow">
                        <div className="flex gap-2">

                            <Navbar />
                            {/* Searchbar only on mobile */}
                            <div className=" flex items-center md:hidden border border-gray-300  w-full">
                                <Searchbar />
                            </div>
                        </div>
                    </div>
                    <div className=" my-2 md:my-0 col-span-10 ">
                        <Slider />
                    </div>
                </div>

                <div>
                    <CategoryList/>
                </div>

            </main>
        </div>
    );
};

export default Home;