import React, { useState } from 'react';

import { FaShoppingCart } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";



const DisplayProduct = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    return (
        <>
            <div className="bg-gray-100 pt-5 pb-10">
                <div className="max-w-7xl mx-auto bg-white shadow-lg p-6">

                    {/* TOP SECTION */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* PRODUCT IMAGE */}
                        <div className="flex justify-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full max-h-[420px] object-cover  shadow"
                            />
                        </div>

                        {/* PRODUCT DETAILS */}
                        <div>
                            <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                                {product.category}
                            </span>

                            <h1 className="text-xl font-bold text-gray-800 mt-3">
                                {product.name}
                            </h1>
                            {/* DESCRIPTION */}
                            <p className=" text-gray-500 leading-relaxed">
                                {product.description}
                            </p>
                            {/* PRICE */}
                            <p className="text-orange-500 text-xl font-semibold ">
                                {product.price}৳
                                <span className="text-gray-600 text-lg"> / {product.unit}</span>
                            </p>
                            {/* BOTTOM SECTION */}
                            {product.featured && (
                                <p className=" text-yellow-600 font-semibold">
                                    ⭐⭐⭐⭐
                                </p>
                            )}
                            {/* AVAILABILITY */}
                            <p className="mt-1 text-gray-500">
                                Stock : <span className="font-semibold">{product.quantity}/ {product.unit}</span>
                            </p>
                            <div className="flex items-center gap-2 mt-6">
                                <p>Quantity : </p>
                                <button
                                    className="px-3 py-1 bg-gray-200 text-xl rounded"
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                >
                                    -
                                </button>

                                <span className="text-lg font-semibold w-8 text-center">
                                    {quantity}
                                </span>

                                <button
                                    className="px-3 py-1 bg-gray-200 text-xl rounded"
                                    onClick={() => setQuantity(prev => prev + 1)}
                                >
                                    +
                                </button>
                            </div>

                            <div>

                            </div>





                            {/* BUTTONS */}
                            <div className="mt-8 flex flex-col gap-3">

                                <button className="flex items-center justify-center gap-2 border border-blue-300 hover:bg-blue-300 hover:text-white py-3 rounded-lg text-lg font-medium shadow">
                                    <FaShoppingCart className="text-xl" />
                                    Add to Cart
                                </button>

                                <button
                                    className="flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-lg text-lg font-medium shadow"
                                >
                                    <FaArrowRight className="text-xl" />
                                    Order Now
                                </button>

                            </div>


                        </div>
                    </div>




                </div>
                {/* seller details section */}
                {/* <div className="max-w-7xl mx-auto bg-white shadow-lg p-6 my-10">
                    
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Seller Information</h3>
                        <p><strong>Name:</strong> {product?.seller?.name}</p>
                        <p><strong>Email:</strong> {product?.seller?.email}</p>
                        <p><strong>District:</strong> {product?.seller?.district}</p>
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default DisplayProduct;