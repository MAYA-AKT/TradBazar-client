import React from 'react';
import { NavLink } from 'react-router';

const CardView = ({ products }) => {
    return (
        <>
            <div className="grid grid-cols-2  lg:grid-cols-4 gap-3 bg-white p-4 md:p-6">
                {products.map((product) => (
                    <NavLink
                        to={`/product/${product._id}`}
                        key={product._id}
                        className="bg-white hover:shadow-lg transition"
                    >
                        <div>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 object-cover"
                            />
                        </div>
                        <div className='p-3'>
                            <h4 className="mt-2 font-medium">{product.name}</h4>
                            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                            <p className="mt-1 text-orange-400">৳{product.price}
                                <span className='text-sm  text-gray-600'>/{product.unit}</span>
                            </p>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    );
};

export default CardView;