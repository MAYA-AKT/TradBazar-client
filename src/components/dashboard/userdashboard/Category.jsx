import React from 'react';
import { NavLink } from 'react-router';
import useUserCategories from '../../../hooks/userUserCategories';

const Category = () => {
    const { categories, isLoading, isError } = useUserCategories();
    console.log(categories);
    
    if (isLoading) return <p>Loading categories...</p>;
    if (isError) return <p>Failed to load categories 😔</p>;



    return (
        <div className='mb-10 mt-5'>
            <h3 className="text-xl text-gray-800 ml-3 md:ml-0">
                Categories
            </h3>


            <div id="categories"  className="my-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-8 gap-3 p-2 md:p-6 bg-white  shadow">
                {categories?.slice(0, 16).map((cat) => (
                    <NavLink
                        to={`/category/${encodeURIComponent(cat.name)}`}
                        key={cat._id}
                        className="bg-white hover:shadow-lg transition p-3"
                    >
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-[120px] object-cover "
                        />
                        <p className="text-center text-gray-700 mt-2 font-medium">{cat.name}</p>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Category;