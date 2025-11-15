import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router';
import useUserCategoryProducts from '../../hooks/useUserCategoryProducts';
import LoadingSpiner from '../error pages/LoadingSpiner';
import useCategories from '../../hooks/useCategories';
import { BsGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import CardView from '../../components/view/CardView';
import GridView from '../../components/view/GridView';

const UserCategory = () => {


    const { categoryName } = useParams();
    const { products, isLoading, isError } = useUserCategoryProducts(categoryName);
    const { categories } = useCategories();
    const [view, setView] = useState("card");


    if (isLoading || isError) {
        return <LoadingSpiner />
    }
    return (
        <div className='bg-gray-100 h-screen'>
            <div className="max-w-7xl mx-auto p-6 flex gap-4">
                {/* Left Sidebar - Categories */}
                <div className="w-1/4 bg-white p-4 hidden md:block">
                    <h3 className="text-md font-semibold mb-4">Categories</h3>
                    <ul className="-space-y-2">
                        {categories.map((cat) => (
                            <li key={cat._id}>
                                <NavLink
                                    to={`/category/${encodeURIComponent(cat.name)}`}
                                    className={({ isActive }) =>
                                        `block p-2 rounded hover:text-orange-600 transition ${isActive ? "text-orange-600 " : "text-gray-600 text-sm"
                                        }`
                                    }
                                >
                                    {cat.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Content - Products */}
                <div className="w-full md:w-3/4 pb-10">
                    <div className='bg-white py-3 pl-4 mb-3 flex justify-between'>
                        <div className='flex '>
                            <h3 className="text-md text-gray-500 font-semibold">
                                Products in "{categoryName}"
                            </h3>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 text-md mr-4">
                            <p className="text-sm font-semibold text-gray-400">View :</p>
                            <BsGridFill
                                className={`cursor-pointer ${view === "card" ? "text-blue-600" : "text-gray-500"}`}
                                onClick={() => setView("card")}
                            />
                            <FaList
                                className={`cursor-pointer ${view === "grid" ? "text-blue-600" : "text-gray-500"}`}
                                onClick={() => setView("grid")}
                            />
                        </div>
                    </div>
                    {products.length === 0 ? (
                        <div className="text-center bg-white p-6">
                            <p className="text-orange-500">No products found in this category.</p>
                        </div>
                    ) : (
                        <>
                            {view === "grid" && <GridView products={products} />}
                            {view === "card" && <CardView products={products} />}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserCategory;