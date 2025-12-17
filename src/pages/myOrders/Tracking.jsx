import React from 'react';
import TrackOrderPage from './TrackOrderPage';
import useTrackOrder from '../../hooks/useTrackOrder';
import { useParams } from 'react-router';
import LoadingSpiner from '../error pages/LoadingSpiner';
import OrderSummary from './OrderSummary';
import { MapPin, Phone } from "lucide-react";

const Tracking = () => {
    const { id } = useParams();
    const { order, isLoading } = useTrackOrder(id);



    if (isLoading) return <LoadingSpiner />;
    if (!order) return <p className="text-center py-10">Order not found</p>;



    return (
        <div className='max-w-7xl mx-auto'>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-1">
                <div className="lg:col-span-1 mx-4 md:mx-0 mt-4">

                    <div className="space-y-2 bg-white p-4">
                        <h3 className="font-medium text-gray-700 flex items-center gap-2">
                            <MapPin size={30} /> Shipping Address
                        </h3>
                        <div className='ml-6'>
                            <p><b>Address :</b> {order.address}</p>
                            <p><b>Area :</b> {order.area}, {order.district}</p>
                            <p className="flex items-center gap-2">
                                <Phone size={16} /> {order.phone}
                            </p>
                        </div>
                    </div>

                </div>
                <div className="lg:col-span-3">
                    <TrackOrderPage order={order} />
                    <OrderSummary order={order} />
                </div>
            </div>

        </div>
    );
};

export default Tracking;