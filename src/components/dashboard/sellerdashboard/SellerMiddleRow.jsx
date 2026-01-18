import React from 'react';

const SellerMiddleRow = ({recentOrders = [], lowStockProducts = []}) => {
    return (
        <div>
           
 
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* --- Recent Orders --- */}
                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

                    <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                            <tr>
                                <th className="px-3 py-2 text-left">Order</th>
                                <th className="px-3 py-2">Amount</th>
                                <th className="px-3 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders?.map(order => (
                                <tr key={order._id} className="border-b">
                                    <td className="px-3 py-2">
                                        {order._id.slice(-6)}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        ৳{order.grandTotal}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                        ${order.orderStatus === 'delivered' && 'bg-green-100 text-green-700'}
                                        ${order.orderStatus === 'pending' && 'bg-yellow-100 text-yellow-700'}
                                        ${order.orderStatus === 'processing' && 'bg-blue-100 text-blue-700'}
                                    `}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- Low Stock Products --- */}
                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="text-lg font-semibold mb-4">Low Stock Products</h3>

                    <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                            <tr>
                                <th className="px-3 py-2 text-left">Product</th>
                                <th className="px-3 py-2">Category</th>
                                <th className="px-3 py-2">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lowStockProducts?.map(product => (
                                <tr key={product._id} className="border-b">
                                    <td className="px-3 py-2">{product.name}</td>
                                    <td className="px-3 py-2 text-center">{product.category}</td>
                                    <td className="px-3 py-2 text-center font-bold text-red-600">
                                        {product.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
          


          

        </div>
    );
};

export default SellerMiddleRow;