import Searchbar from '../Searchbar';
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import CategoryLinks from '../../components/category/CategoryLinks';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (


        <div className='flex justify-between items-center gap-3'>
            <div className="relative ">
                <p className="text-xl bg-gray-300 font-bold py-2 hidden md:block text-center">Categories</p>
                <button
                    className=" md:hidden "
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <IoMenu size={34} />
                </button>
                <div
                    className={`
                md:flex md:flex-col md:gap-2
                fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50
                transform transition-transform duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                md:static md:translate-x-0 md:shadow-none md:bg-transparent
            `}>
                    <div className='flex justify-end md:hidden p-3 '>
                        <button className='text-2xl ' onClick={() => setIsMenuOpen(false)}>
                            <IoCloseOutline />
                        </button>
                    </div>
                    <div className="p-4 text-gray-700 space-y-2">
                        <CategoryLinks />
                    </div>
                </div>
            </div>

        </div>
    );


};

export default Navbar;