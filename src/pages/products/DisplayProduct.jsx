import React, { useState } from 'react';

import { FaShoppingCart } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from 'react-router';



const DisplayProduct = ({ product }) => {

    const { name, image, category, price, unit, description, featured, quantity } = product || {};
    const [selectedQuantity, setselectedQuantity] = useState(1);
    // const totalPrice = selectedQuantity * price;


    return (
        <>
            <div className="bg-gray-100 pt-5 pb-10">
                <div className="max-w-7xl mx-auto bg-white shadow-lg p-6">

                    {/* TOP SECTION */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* PRODUCT IMAGE */}
                        <div className="flex justify-center">
                            <img
                                src={image}
                                alt={name}
                                className="w-full max-h-[420px] object-cover  shadow"
                            />
                        </div>

                        {/* PRODUCT DETAILS */}
                        <div>
                            <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                                {category}
                            </span>

                            <h1 className="text-xl font-bold text-gray-800 mt-3">
                                {name}
                            </h1>

                            <p className=" text-gray-500 leading-relaxed">
                                {description}
                            </p>

                            <p className="text-orange-500 text-xl font-semibold ">
                                {price}৳
                                <span className="text-gray-600 text-lg"> / {unit}</span>
                            </p>

                            {featured && (
                                <p className=" text-yellow-600 font-semibold">
                                    ⭐⭐⭐⭐
                                </p>
                            )}

                            <p className="mt-1 text-gray-500">
                                Stock : <span className="font-semibold">{quantity}/ {unit}</span>
                            </p>
                            <div className="flex items-center gap-2 mt-6">
                                <p>Quantity : </p>


                                <button
                                    className="px-3 py-1 bg-gray-200 text-xl rounded"
                                    onClick={() => setselectedQuantity(prev => Math.max(1, prev - 1))}
                                >
                                    -
                                </button>


                                <span className="text-lg font-semibold w-8 text-center">
                                    {selectedQuantity}
                                </span>


                                <button
                                    className="px-3 py-1 bg-gray-200 text-xl rounded"
                                    onClick={() =>
                                        setselectedQuantity(prev => Math.min(quantity, prev + 1))
                                    }
                                    disabled={selectedQuantity >= quantity}
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


                                <NavLink
                                    to={`/checkout/${product._id}?quantity=${selectedQuantity}`}
                                    className="flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-lg text-lg font-medium shadow"
                                >
                                    <FaArrowRight className="text-xl" />
                                    Order Now
                                </NavLink>


                            </div>


                        </div>
                    </div>




                </div>
                {/* seller details section */}

            </div>
        </>
    );
};

export default DisplayProduct;