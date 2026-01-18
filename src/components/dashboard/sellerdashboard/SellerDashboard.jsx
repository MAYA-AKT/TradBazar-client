import React from "react";
import { FaBox, FaCheckCircle, FaShoppingCart, FaDollarSign, FaStar } from 'react-icons/fa';
import useSellerOverview from "../../../hooks/useSellerOverview";
import useAuth from "../../../hooks/useAuth";
import SellerCall from "../../videoConference/SellerCall";
import StatsCardAdmin from "../adminDashboard/StatsCardAdmin";












const SellerDashboard = () => {

    const { user } = useAuth();
    const { overview = {}, overviewLoading, overviewError } = useSellerOverview(user?.email);

    if (overviewLoading) return <p>Loading...</p>;
    if (overviewError) return <p>Error loading overview</p>;

    console.log(overview); // Now should show correct stats








    return (
        <div className="px-10 bg-gray-100 min-h-screen">



            {/* Video Call Button */}
            <SellerCall sellerEmail={user?.email} />
            {/* end */}


            {/* Greeting */}
            <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h1>
            <p className="text-gray-500 mb-6">
                Here’s a quick overview of your store performance.
            </p>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <StatsCardAdmin title="Total Products" value={overview.totalProducts} icon={<FaBox />} color="bg-yellow-500" />
                <StatsCardAdmin title="Verified Products" value={overview.verifiedProducts} icon={<FaCheckCircle />} color="bg-green-500" />
                <StatsCardAdmin title="Total Orders" value={overview.totalOrders} icon={<FaShoppingCart />} color="bg-blue-500" />
                <StatsCardAdmin title="Pending Orders" value={overview.pendingOrders} icon={<FaShoppingCart />} color="bg-red-500" />
                <StatsCardAdmin title="Total Earnings" value={`$${overview.totalRevenue}`} icon={<FaDollarSign />} color="bg-teal-500" />
                <StatsCardAdmin title="Total Reviews" value={overview.totalReviews} icon={<FaStar />} color="bg-purple-500" />
               
            </div>
        </div>
    );
};





export default SellerDashboard;