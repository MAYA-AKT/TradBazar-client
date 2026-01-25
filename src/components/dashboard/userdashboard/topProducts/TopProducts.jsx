import React from 'react';
import useTopProducts from '../../../../hooks/useTopProducts';
import LoadingSpiner from '../../../../pages/error pages/LoadingSpiner';
import { NavLink } from 'react-router';

const TopProducts = () => {
    const { topProducts, isLoading, isError } = useTopProducts();


    if (isLoading || isError)
        return <LoadingSpiner />
    if (topProducts.length === 0) {
        return (
            <h3 className="text-center text-gray-500 text-lg mt-20">
                No products found .
            </h3>
        );
    }


    return (
        <>
            <div className='my-10'>
                <h2 className="text-xl text-gray-800 mb-4 ml-2 md:ml-0">Featured Products</h2>
                <section className=" p-2 md:p-4 bg-white shadow">


                    <div className="grid grid-cols-2  md:grid-cols-5 lg:grid-cols-6 gap-3 p-2 md:p-6">
                        {topProducts.map((product) => (
                            <NavLink
                                to={`/product/${product._id}`}
                                key={product._id}
                                className="rounded-lg  hover:shadow-lg transition ">
                                <div>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-40 object-cover mb-3"
                                    />
                                </div>
                                <div className='p-4'>
                                    <h3 className="text-md font-semibold text-gray-800 capitalize">{product.name}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                                    <p className="text-orange-400  mt-2">{product.price}৳ <span className='text-gray-500'>({product.quantity})</span></p>

                                </div>
                            </NavLink>
                        ))}
                    </div>
                </section>
            </div>
        </>


    );
};

export default TopProducts;