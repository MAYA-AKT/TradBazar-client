import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { NavLink, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAddToCart from '../../hooks/useAddToCart';

const DisplayProduct = ({ product, reviews }) => {
    
    
    const { user } = useAuth();
    const addToCart = useAddToCart();
    const navigate = useNavigate();

    const { _id, name, image, category, price, unit, description, quantity ,seller} = product || {};
    const [selectedQuantity, setselectedQuantity] = useState(1);


    // Calculate average rating
    const averageRating = reviews?.length
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : 0;


    // add to cart 


    const handleAddToCart = () => {
        addToCart.mutate({
            userEmail: user?.email,
            productId: _id,
            name: name,
            image: image,
            price: price,
            seller:seller
        });
    };


    return (
        <>
            <div className="bg-gray-100 pt-5 pb-10">
                <div className="max-w-7xl mx-auto bg-white p-6">

                    {/* TOP SECTION */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* PRODUCT IMAGE */}
                        <div className="flex justify-center">
                            <img
                                src={image}
                                alt={name}
                                className="w-full max-h-[420px] object-cover shadow"
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

                            <p className="text-gray-500 leading-relaxed">
                                {description}
                            </p>

                            <p className="text-orange-500 text-xl font-semibold">
                                {price}৳
                                <span className="text-gray-600 text-lg"> / {unit}</span>
                            </p>

                            {/* ⭐ Rating */}
                            <div className="mt-2 flex items-center gap-2">
                                <p className="text-yellow-500 text-xl">⭐</p>
                                <span className="">{averageRating}</span>
                                <span className="text-gray-500">
                                    ({reviews?.length || 0} reviews)
                                </span>
                            </div>

                            <p className="mt-1 text-gray-500">
                                Stock : <span className="">{quantity} / {unit}</span>
                            </p>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-2 mt-6">
                                <p>Quantity:</p>

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

                            {/* BUTTONS */}
                            <div className="mt-8 flex flex-col gap-3">
                                <NavLink
                                    to='/cart'
                                    onClick={handleAddToCart}
                                    className="flex items-center justify-center gap-2 border border-blue-300 hover:bg-blue-300 hover:text-white py-3 rounded-lg text-lg font-medium shadow"
                                >
                                    <FaShoppingCart className="text-xl" />
                                    Add to Cart
                                </NavLink>

                                <button
                                    onClick={() =>
                                        navigate("/checkout", {
                                            state: {
                                                products: [
                                                    {
                                                        ...product,
                                                        quantity: selectedQuantity,
                                                    },
                                                ],
                                            },
                                        })
                                    }
                                    className="flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-lg text-lg font-medium shadow"
                                >
                                    <FaArrowRight className="text-xl" />
                                    Order Now
                                </button>


                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </>
    );
};

export default DisplayProduct;
