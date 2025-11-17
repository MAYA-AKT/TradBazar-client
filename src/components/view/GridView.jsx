import React from 'react';
import { NavLink } from 'react-router';

const GridView = ({ products }) => {
    return (
        <>
            <div className="flex flex-col gap-0 md:gap-3 bg-white p-4">
                {products.map((product) => (
                    <NavLink
                        to={`/product/${product._id}`}
                        key={product._id}
                        className="flex gap-4 bg-white hover:shadow-md transition rounded p-3"
                    >
                        {/* Left Image */}
                        <img
                            src={product.image}
                            alt={product.name}
                            className=" w-20 h-25 md:w-58 md:h-48  object-cover"
                        />

                        {/* Right Content */}
                        <div className="flex-1">
                            <h4 className="font-medium text-md text-gray-700">{product.name}</h4>
                            <p className="text-gray-500 my-2 text-sm line-clamp-3">
                                {product.description}
                            </p>
                            <p className="mt-1 text-right text-orange-500 text-lg">
                                ৳{product.price}
                                <span className='text-sm  text-gray-600'>/{product.unit}</span>
                            </p>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    );
};

export default GridView;