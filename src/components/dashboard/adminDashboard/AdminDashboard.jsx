import React from 'react';
import { FaUsers, FaBox, FaCheckCircle, FaDollarSign, FaShoppingCart, FaBoxOpen, FaTicketAlt } from 'react-icons/fa';
import StatsCardAdmin from './StatsCardAdmin';
import useAdminOverview from '../../../hooks/useAdminOverview';
import AdminMiddleRow from './AdminMiddleRow';
import AdminBottomRow from './AdminBottomRow';

const AdminDashboard = () => {
    const { overview, isLoading, isError } = useAdminOverview();
    console.log('overview admin', overview);

    if (isLoading) return <p>Loading stats...</p>;
    if (isError) return <p>Error loading stats</p>;

    return (
        <div className='px-20 pb-20'>
            <div className=' mb-15'>
                <h1 className="text-xl py-4 font-bold ">Overview</h1>
                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">

                    <div className='bg-gradient-to-b from-blue-200 to-blue-400 p-6 rounded-lg text-white'>
                        <StatsCardAdmin
                            title="Total Users"
                            value={overview.totalUsers || 0}
                            icon={<FaUsers />}
                            color="bg-blue-500"
                        />
                    </div>
                    <div className='bg-gradient-to-b from-[#A7AAE1] to-[#696FC7] p-6 rounded-lg text-white'>
                        <StatsCardAdmin
                        title="Total Sellers"
                        value={overview.totalSellers || 0}
                        icon={<FaUsers />}
                        color="bg-[#696FC7]"
                    />
                    </div>
                    <div className='bg-gradient-to-b from-[#E7BCDE] to-[#ED9ED6] p-6 rounded-lg text-white'>
                        <StatsCardAdmin
                        title="Products"
                        value={overview.totalProducts || 0}
                        icon={<FaBox />}
                        color="bg-[#6E026F]"
                    />
                    </div>
                    <div className='bg-gradient-to-b from-green-200 to-green-400 p-6 rounded-lg text-white'>
                        <StatsCardAdmin
                        title="Verified Products"
                        value={overview.verifiedProducts || 0}
                        icon={<FaCheckCircle />}
                        color="bg-green-500"
                    />
                    </div>
                    <div className='bg-gradient-to-b from-teal-200 to-teal-400 p-6 rounded-lg text-white'>
                        <StatsCardAdmin
                        title="Revenue"
                        value={`$${overview.totalRevenue || 0}`}
                        icon={<FaDollarSign />}
                        color="bg-teal-500"
                    />
                    </div>
                    <div className='bg-gradient-to-b from-purple-200 to-purple-400 p-6 rounded-lg text-white'>
                        <StatsCardAdmin
                        title="Recent Orders"
                        value={overview.recentOrders?.length || 0} // ✅ fix
                        icon={<FaShoppingCart />}
                        color="bg-purple-500"
                    />
                    </div>
                   <div className='bg-gradient-to-b from-yellow-200 to-yellow-400 p-6 rounded-lg text-white'>
                     <StatsCardAdmin
                        title="Pending Products"
                        value={overview.pendingProducts?.length || 0} // ✅ fix
                        icon={<FaBoxOpen />}
                        color="bg-yellow-500"
                    />
                   </div>
                    <div className='bg-gradient-to-b from-blue-200 to-blue-400 p-6 rounded-lg text-white'>
                        <StatsCardAdmin
                        title="Total Coupons"
                        value={overview.totalCoupons || 0}
                        icon={<FaTicketAlt />}
                        color="bg-blue-500"
                    />
                    </div>
                </div>
            </div>
            <div className='my-10'>
                <h2 className="text-xl mb-4  font-semibold">Recent Activity</h2>
                <AdminMiddleRow recentOrders={overview?.recentOrders} pendingProducts={overview?.pendingProducts} />
            </div>
            <div>
                <h2 className="text-xl py-4 font-semibold ">Analytics & Insights</h2>
                <AdminBottomRow
                    revenueData={overview?.revenueData || []}
                    ordersData={overview?.ordersByStatus || []}
                    productsData={overview?.productsByCategory || []}
                />
            </div>
        </div>
    );
};

export default AdminDashboard;
