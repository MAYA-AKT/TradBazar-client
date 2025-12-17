import React from 'react';

const DisplayOrderProduct = ({ product, quantity }) => {
    return (
        <div className='p-4 bg-white hover:shadow-sm transition'>

            <div className="flex flex-col items-center md:flex-row gap-4 ">
                <div className="w-40 h-40  overflow-hidden bg-gray-100">
                    <img
                        src={product?.image}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="">
                    <p className="text-lg font-semibold text-gray-800">{product?.name}</p>
                    <p className="text-md  text-gray-500">{product?.description}</p>
                    <p className="text-sm ">Quantity : {quantity}</p>

                </div>

            </div>
            <div className='text-end'>
                <p className="text-lg font-medium text-orange-500"> Price :
                    {product?.price} <span className="text-gray-400 text-sm">{product?.unit}</span>
                </p>
            </div>


        </div>
    );
};

export default DisplayOrderProduct;