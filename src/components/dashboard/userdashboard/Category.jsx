import React from 'react';
import useCategories from '../../../hooks/useCategories';

const Category = () => {
    const { categories, isLoading, isError } = useCategories();

    if (isLoading) return <p>Loading categories...</p>;
    if (isError) return <p>Failed to load categories 😔</p>;
    console.log(categories);


    return (
        <div className='my-10'>
            <h3 className="text-xl font-semibold text-gray-800 ">
                Categories
            </h3>


            <div className="my-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-8 gap-6">
                {categories.slice(0, 16).map((cat) => (
                    <div
                        key={cat._id}
                        className="bg-white  shadow hover:shadow-lg transition p-3"
                    >
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-[120px] object-cover "
                        />
                        <p className="text-center text-gray-700 mt-2 font-medium">{cat.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;