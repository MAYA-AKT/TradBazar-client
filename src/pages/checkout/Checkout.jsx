import React from 'react';
import { useParams, useSearchParams } from 'react-router';

import UserInfoSection from './UserInfoSection';
import ShippingInfo from './ShippingInfo';
import { useForm } from 'react-hook-form';
import useProduct from '../../hooks/useProduct';
import LoadingSpiner from '../error pages/LoadingSpiner';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';


const Checkout = () => {

    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();
    const quantity = parseInt(searchParams.get("quantity") || 1);
    const { product, productLoading, productError } = useProduct(id);

    const totalPrice = product?.price * quantity;
    const grandTotal = totalPrice + 50







    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const orderInfo = {
                userEmail: user?.email,
                productId: product?._id,
                address: data.address,
                phone: data.phone,
                district: data.district,
                area: data.area,
                quantity,
                totalPrice,
                shippingCost: 50,
                grandTotal,
                sellerInfo:{
                    name:product?.seller?.name,
                    email:product?.seller?.email,
                    district:product?.seller?.district,
                }
            }
            console.log('order INfo ' , orderInfo);
            
            const res = await axiosSecure.post("/orders", orderInfo);

            if (res.data.success) {
                alert("Order placed successfully!");
                // Redirect to orders page
                // navigate("/orders");
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to place order");
        }
    };


    if (productLoading || productError) {
        return <LoadingSpiner />
    }


    return (
        <>
            <div className='bg-gray-100 h-screen'>
                <div className='max-w-7xl mx-auto md:flex gap-4 py-5'>
                    {/* left div */}
                    <div className=' mx-3 md:mx-0 md:w-4/6 p-10  bg-white shadow-md'>
                        <UserInfoSection register={register} errors={errors} />
                    </div>
                    {/* right div */}
                    <div className='my-4 mx-3 md:mx-0 md:my-0 md:w-2/6 p-6  bg-white shadow-md'>
                        <ShippingInfo handleSubmit={handleSubmit} onSubmit={onSubmit} product={product} quantity={quantity} />
                    </div>

                </div>
                <div>
                    display order product
                    <h1 className='text-red-600 '>{product?.name}</h1>
                </div>
            </div>
        </>
    );
};

export default Checkout;