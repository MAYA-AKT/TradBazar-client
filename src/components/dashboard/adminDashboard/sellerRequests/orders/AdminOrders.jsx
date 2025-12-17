import { useState } from "react";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpiner from "../../../../../pages/error pages/LoadingSpiner";


const AdminOrders = () => {
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [page, setPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const limit = 10; 

    // Fetch orders
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["adminOrders", search, filterStatus, page],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/orders", {
                params: { search, status: filterStatus, page, limit }
            });
            return res.data;
        },
    });

    const orders = data?.orders || [];
    const totalPages = data?.totalPages || 1;

    const handleStatusUpdate = async (orderId, status) => {
        try {
            const res = await axiosSecure.patch(`/admin/orders/${orderId}`, { status });
            if (res.data.success) {
                toast.success("Order status updated");
                refetch();
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Server error");
        }
    };

    if (isLoading || isError) return <LoadingSpiner/>;
    

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold mb-4 text-center my-10"> Orders Management</h2>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-6">
                <input
                    type="text"
                    placeholder="Search by email..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="input input-bordered w-full sm:w-1/3 focus:border-0"
                />

                <select
                    value={filterStatus}
                    onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
                    className="select select-bordered  w-full sm:w-1/4 focus:border-0"
                >
                    <option value="">All Status</option>
                    <option value="pending" className="bg-green">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Order ID</th>
                            <th className="p-2">Customer Email</th>
                            <th className="p-2">Grand Total</th>
                            <th className="p-2"> Order Status</th>
                            <th className="p-2">Payment</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-b border-gray-200">
                                <td className="p-2">{order._id}</td>
                                <td className="p-2">{order.userEmail}</td>
                                <td className="p-2">{order.grandTotal} ৳</td>
                                <td className="p-2 capitalize">{order.orderStatus}</td>
                                <td className="p-2 capitalize">{order.paymentStatus}</td>
                                <td className="p-2 flex gap-2">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        View
                                    </button>
                                    <select
                                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                        defaultValue={order.orderStatus}
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 rounded border ${page === i + 1 ? "bg-orange-500 text-white" : ""}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded shadow-lg relative">
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-2 right-2 text-xl font-bold"
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-bold mb-3">Order {selectedOrder._id}</h3>
                        <p><b>Customer:</b> {selectedOrder.userEmail}</p>
                        <p><b>Phone:</b> {selectedOrder.phone}</p>
                        <p><b>Address:</b> {selectedOrder.address}, {selectedOrder.district}, {selectedOrder.area}</p>
                        <p><b>Payment:</b> {selectedOrder.paymentStatus}</p>
                        <p><b>Status:</b> {selectedOrder.orderStatus}</p>
                        <p className="mt-2 font-semibold">Items:</p>
                        <ul className="ml-5 list-disc">
                            {selectedOrder.items?.map((item, i) => (
                                <li key={i}>
                                    {item.name} × {item.quantity} ({item.price}৳ each)
                                </li>
                            )) || <li>No items</li>}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
