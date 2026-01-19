import React from "react";
import { FaBox, FaCheckCircle, FaShoppingCart, FaDollarSign, FaStar } from 'react-icons/fa';
import useSellerOverview from "../../../hooks/useSellerOverview";
import useAuth from "../../../hooks/useAuth";
import StatsCardAdmin from "../adminDashboard/StatsCardAdmin";
import SellerMiddleRow from "./SellerMiddleRow";
import SellerSalesInsights from "./SellerSalesInsights";
import { useTitle } from "../../../hooks/useTitle";





const SellerDashboard = () => {
  // dynamic title
    useTitle('Dashboard');

    const { user } = useAuth();
    const { overview = {}, overviewLoading, overviewError } = useSellerOverview(user?.email);




    if (overviewLoading) return <p className="text-center mt-20">Loading...</p>;
    if (overviewError) return <p className="text-center mt-20">Error loading overview</p>;


    return (
        <div className="px-10 ">


            {/* vdo conference */}

            


            {/* end */}
            <h1 className="text-md font-semibold mb-4">Overview</h1>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">

                <div className="bg-gradient-to-b from-yellow-200 to-yellow-400 p-6 rounded-lg text-white">
                    <StatsCardAdmin title="Total Products" value={overview.totalProducts} icon={<FaBox />} color="bg-yellow-500" />
                </div>
                <div className="bg-gradient-to-b from-green-200 to-green-400 p-6 rounded-lg text-white">
                    <StatsCardAdmin title="Verified Products" value={overview.verifiedProducts} icon={<FaCheckCircle />} color="bg-green-500" />
                </div>
                <div className="bg-gradient-to-b from-blue-200 to-blue-400 p-6 rounded-lg text-white">
                    <StatsCardAdmin title="Total Orders" value={overview.totalOrders} icon={<FaShoppingCart />} color="bg-blue-500" />
                </div>
                <div className="bg-gradient-to-b from-red-200 to-red-400 p-6 rounded-lg text-white">
                    <StatsCardAdmin title="Pending Orders" value={overview.pendingOrders} icon={<FaShoppingCart />} color="bg-red-500" />
                </div>
                <div className="bg-gradient-to-b from-teal-200 to-teal-400 p-6 rounded-lg text-white">
                    <StatsCardAdmin title="Total Earnings" value={`$${overview.totalRevenue}`} icon={<FaDollarSign />} color="bg-teal-500" />
                </div>
                <div className="bg-gradient-to-b from-purple-200 to-purple-400 p-6 rounded-lg text-white">
                    <StatsCardAdmin title="Total Reviews" value={overview.totalReviews} icon={<FaStar />} color="bg-purple-500" />

                </div>

            </div>
            <div className="my-10">
                <h2 className="text-md font-semibold mb-4">
                    Order & Inventory Management
                </h2>

                <SellerMiddleRow
                    recentOrders={overview.recentOrders}
                    lowStockProducts={overview.lowStockProducts}
                />
            </div>
            <div className="pb-20">
                <h2 className="text-md font-semibold mt-10 mb-4">
                    Sales Insights
                </h2>

                <SellerSalesInsights
                    revenueByDate={overview?.revenueByDate || []}
                    topProducts={overview?.topProducts || []}
                />
            </div>
        </div>
    );
};





export default SellerDashboard;