import React from 'react';
import { FaShoppingCart, FaBoxOpen } from 'react-icons/fa';

const AdminMiddleRow = ({ recentOrders = [], pendingProducts = [] }) => {
    return (
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* --- Recent Orders Table --- */}
            <div className="bg-blue-50 shadow rounded-lg p-6">
                <div className="flex items-center mb-4">
                    <FaShoppingCart className="text-blue-500 text-2xl mr-2" />
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                </div>
                {recentOrders?.length === 0 ? (
                    <p className="text-gray-500">No recent orders.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-yellow-100 text-yellow-700">
                                <tr className="">
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Order ID</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Seller</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Payment</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentOrders?.map((order) => (
                                    <tr key={order._id}>
                                        <td className="px-4 py-2 text-sm text-gray-700">{order._id.slice(-6)}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{order?.sellerInfo?.email}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">${order.grandTotal}</td>
                                        <td
                                            className={`px-4 py-2 text-sm font-medium ${order.orderStatus === 'pending' ? 'text-yellow-500' :
                                                order.orderStatus === 'processing' ? 'text-blue-500' :
                                                    order.orderStatus === 'delivered' ? 'text-green-500' :
                                                        order.orderStatus === 'cancelled' ? 'text-red-500' :
                                                            'text-gray-700'
                                                }`}
                                        >
                                            {order.orderStatus}
                                        </td>
                                        <td
                                            className={`px-4 py-2 text-sm font-medium ${order.paymentStatus === 'paid' ? 'text-blue-500' :
                                                order.paymentStatus === 'pending' ? 'text-red-500' :
                                                    order.paymentStatus === 'refunded' ? 'text-yellow-500' :
                                                        'text-gray-700'
                                                }`}
                                        >
                                            {order.paymentStatus}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* --- Pending Products Table --- */}
            <div className="bg-green-50 shadow rounded-lg p-6">
                <div className="flex items-center mb-4">
                    <FaBoxOpen className="text-yellow-500 text-2xl mr-2" />
                    <h2 className="text-xl font-semibold">Pending Products</h2>
                </div>
                {pendingProducts.length === 0 ? (
                    <p className="text-gray-500 text-center mt-10">No pending products.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className=''>
                                <tr className="bg-yellow-100 text-yellow-700">
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Product Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Seller</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Category</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {pendingProducts.map((product) => (
                                    <tr key={product._id}>
                                        <td className="px-4 py-2 text-sm text-gray-700">{product.name}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{product.seller?.email}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{product.category}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{new Date(product.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminMiddleRow;
