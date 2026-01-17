import React from "react";
import { FiPackage, FiShoppingCart, FiDollarSign, FiStar } from "react-icons/fi";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
} from "recharts";
import useSellerOverview from "../../../hooks/useSellerOverview";
import useAuth from "../../../hooks/useAuth";
import SellerCall from "../../videoConference/SellerCall";






const StatCard = ({ title, value, icon }) => (
    <div className="flex items-center justify-between p-4 rounded shadow bg-white">
        <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="text-3xl text-gray-400">{icon}</div>
    </div>
);





const SellerDashboard = () => {

    const { user } = useAuth();
    const { overview = {}, isLoading, isError } = useSellerOverview(user?.email);

   console.log('overview',overview);
   
  







    if (isLoading)
        return <p className="text-center py-10">Loading dashboard...</p>;
    if (isError)
        return (
            <p className="text-center py-10 text-red-500">
                Failed to load dashboard
            </p>
        );

    // ----- Prepare monthly earnings chart -----
    const monthlyEarnings = Array(12).fill(0);
    overview.recentOrders?.forEach((order) => {
        const date = new Date(order.createdAt);
        const month = date.getMonth();

        // Include earnings only if payment is completed/paid
        if (
            order.orderStatus === "delivered" &&
            ((order.paymentMethod === "Card" && order.paymentStatus === "paid") ||
                order.paymentMethod === "COD")
        ) {
            monthlyEarnings[month] += order.grandTotal || 0;
        }
    });

    const chartData = monthlyEarnings.map((total, idx) => ({
        month: new Date(0, idx).toLocaleString("default", { month: "short" }),
        earnings: total,
    }));
    console.log('chartData',chartData);
    
    const colors = [
        "#f97316",
        "#facc15",
        "#10b981",
        "#3b82f6",
        "#8b5cf6",
        "#ec4899",
        "#f87171",
        "#34d399",
        "#60a5fa",
        "#fcd34d",
        "#a78bfa",
        "#f472b6",
    ];






    return (
        <div className="p-6 bg-gray-100 min-h-screen">

           
           {/* Video Call Button */}
            <SellerCall sellerEmail={user?.email} />
            {/* end */}


            {/* Greeting */}
            <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h1>
            <p className="text-gray-500 mb-6">
                Here’s a quick overview of your store performance.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <StatCard
                    title="Total Products"
                    value={overview.productsCount || 0}
                    icon={<FiPackage />}
                />
                <StatCard
                    title="Orders"
                    value={overview.ordersCount || 0}
                    icon={<FiShoppingCart />}
                />
                <StatCard
                    title="Earnings"
                    value={`Tk ${overview.totalEarnings || 0}`}
                    icon={<FiDollarSign />}
                />
                <StatCard
                    title="Reviews"
                    value={overview.reviewsCount || 0}
                    icon={<FiStar />}
                />
            </div>

            {/* Monthly Earnings Chart */}
            <div className="bg-white rounded shadow p-4 mb-6">
                <h3 className="text-lg font-semibold mb-2">Monthly Earnings</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                            formatter={(value) => `Tk ${value}`}
                            contentStyle={{
                                backgroundColor: "#111827",
                                borderRadius: "8px",
                                color: "#fff",
                            }}
                        />
                        <Bar dataKey="earnings">
                            {chartData.map((entry, idx) => (
                                <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded shadow p-4 mb-6">
                <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
                {overview.recentOrders?.length === 0 ? (
                    <p className="text-gray-500">No recent orders.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-2 border text-left">Order ID</th>
                                    <th className="px-4 py-2 border text-left">Product</th>
                                    <th className="px-4 py-2 border text-center">Qty</th>
                                    <th className="px-4 py-2 border text-right">Total</th>
                                    <th className="px-4 py-2 border text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {overview.recentOrders?.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border">{order._id.slice(-6)}</td>
                                        <td className="px-4 py-2 border">{order.productId || "—"}</td>
                                        <td className="px-4 py-2 border text-center">
                                            {order.quantity || 0}
                                        </td>
                                        <td className="px-4 py-2 border text-right">
                                            Tk {order.grandTotal || 0}
                                        </td>
                                        <td className="px-4 py-2 border text-center capitalize">
                                            {order.orderStatus || "pending"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Alerts & Top Product */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {overview.lowStockProducts?.length > 0 && (
                    <div className="p-4 bg-yellow-100 rounded shadow">
                        <p className="font-semibold text-yellow-800">Low Stock Alert!</p>
                        <p>
                            {overview.lowStockProducts?.length} products are running low.
                        </p>
                    </div>
                )}

                {overview.topProduct && (
                    <div className="p-4 bg-green-100 rounded shadow">
                        <p className="font-semibold text-green-800">Top Selling Product</p>
                        <p>{overview.topProduct?.name}</p>
                    </div>
                )}
            </div>
        </div>
    );
};





export default SellerDashboard;