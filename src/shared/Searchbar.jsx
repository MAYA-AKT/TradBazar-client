import React from 'react';
import { CiSearch } from "react-icons/ci";

const Searchbar = () => {
    return (
       
            <>  <CiSearch className='hidden md:flex' size={22} />
                <input
                    type="text"
                    placeholder="Search for products..."
                    className="input border-0 focus:outline-none focus:border-transparent focus:ring-0 w-full"
                />
                <button className="pr-3 btn ">
                    Search
                </button>
            </>

       
    );
};

export default Searchbar;