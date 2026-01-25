import React from 'react';
import LoadingSpiner from '../../../../pages/error pages/LoadingSpiner';
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from 'react-router';
import useCategoryBadge from '../../../../hooks/useCategoryBadge';

const CategoryBadge = () => {


     const { category, isLoading, isError } = useCategoryBadge();
    

     if(isLoading,isError){
        return <LoadingSpiner/>
     }


    return (
        <div className="">
            <div className="relative z-50 hidden md:block  group ml-80">

                <p className="text-md flex items-center w-[120px] bg-green-500 my-2 ml-10 text-white font-bold px-3 py-1 rounded-full cursor-pointer">
                    Category <span className="ml-2">
                        <IoIosArrowDown />
                    </span>
                </p>

                {/* DROPDOWN (inside same max-w-7xl container) */}
                <div className="absolute bg-white shadow-lg 
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-200 z-50">
                    <ul className="flex flex-col text-sm w-55 p-4">
                        {category?.map((cat) => (
                            <NavLink
                                to={`/category/${encodeURIComponent(cat.name)}`}
                                key={cat._id}
                                className="py-1 px-2 hover:bg-gray-100 hover:text-orange-400 cursor-pointer text-gray-700"
                            >
                                {cat.name}
                            </NavLink>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CategoryBadge;