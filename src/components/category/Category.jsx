import React from 'react';
import Navbar from '../../shared/header/Navbar';
const Category = () => {
    return (
        <div>
            <div className=' w-11/12 md:w-10/12 mx-auto'>
                <div className='grid grid-cols-12'>
                    <div className=" col-span-2 md:bg-gray-200">
                        <div className=" ">

                            <Navbar />
                        </div>
                    </div>
                    <div className='col-span-10'>
                        <p>category</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;