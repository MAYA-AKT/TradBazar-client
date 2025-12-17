import React from 'react';
import useCategories from '../../../../hooks/useCategories';
import LoadingSpiner from '../../../../pages/error pages/LoadingSpiner';
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from 'react-router';

const CategoryBadge = () => {


     const { categories, isLoading, isError } = useCategories();


     if(isLoading,isError){
        return <LoadingSpiner/>
     }


    return (
        <div className="bg-green-500">
            <div className="relative hidden md:block  group ml-80  max-w-7xl mx-auto">

                <p className="text-sm flex items-center text-blue-600 px-3 py-1 rounded-full cursor-pointer">
                    Category <span className="ml-2">
                        <IoIosArrowDown />
                    </span>
                </p>

                {/* DROPDOWN (inside same max-w-7xl container) */}
                <div className="absolute bg-white shadow-lg 
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-200 z-50">
                    <ul className="flex flex-col text-sm w-55 p-4">
                        {categories?.map((cat) => (
                            <NavLink
                                to={`/category/${encodeURIComponent(cat.name)}`}
                                key={cat._id}
                                className="py-1 px-2 hover:bg-gray-100 cursor-pointer text-gray-700"
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