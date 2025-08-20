import React, { use } from 'react';




const categoryPromise = fetch('/category.json')
    .then((res) => {
        return res.json();
    }).catch((err) => {
        return console.log(err);

    })

const CategoryList = () => {
    const categories = use(categoryPromise);
    console.log(categories);

    return (
        <div className='my-10'>
            <h3 className='font-bold text-2xl'>Category</h3>
            <div
                className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-6 scrollbar-hide"
            >
                {categories?.map((category) => (
                    <div
                        key={category.id}
                        className="flex-shrink-0 sm:flex-shrink bg-white flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-orange-50"
                    >
                        <div className="w-full flex-1 flex items-center justify-center">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-20 object-contain"
                            />
                        </div>
                        <p className="mt-3 text-gray-700 font-medium text-center">{category.name}</p>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default CategoryList;