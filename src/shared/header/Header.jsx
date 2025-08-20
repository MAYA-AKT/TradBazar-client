import React from 'react';
import { BiSolidCart } from "react-icons/bi";

import Searchbar from '../Searchbar';
import Links from './Links';
import { NavLink } from 'react-router';


const Header = () => {
    return (
        <div className="bg-base-100 shadow-sm">
            <div className="flex justify-between items-center h-16 max-w-11/12 md:max-w-10/12 mx-auto">

                {/*logo */}
                <div className=''>
                    <a className="text-2xl font-bold  cursor-pointer">
                        tradBazar
                    </a>
                </div>

                {/* search Bar */}
                <div className=' hidden md:flex items-center w-full border border-gray-300  pl-3 max-w-md'>
                    <Searchbar />
                </div>
              
                <div className="flex items-center gap-4">
                   
                    {/* profile */}
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100  z-10 mt-3 w-52 p-2 shadow"
                        >
                            <NavLink to='/'>Profile</NavLink>
                            <NavLink to='/'>My Orders</NavLink>
                            <button>LogOut</button>
                        </ul>
                    </div>
                    
                    {/*cart */}
                    <div className="relative">
                        <BiSolidCart size={28} className="cursor-pointer" />
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            0
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Header;