import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useShipOrder from "../../../hooks/useShipOrder";
import useSellerOrders from "../../../hooks/useSellerOrders";
import LoadingSpiner from "../../../pages/error pages/LoadingSpiner";
import { useTitle } from "../../../hooks/useTitle";

const SellerOrders = () => {
  // dynamic title
    useTitle('Orders');

    const { user } = useAuth();
    const sellerEmail = user?.email;

    // Pagination state
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const { orders, isLoading, isError, refetch, totalPages } = useSellerOrders(
        sellerEmail,
        page,
        pageSize
    );

    console.log(orders);



    const [selectedOrder, setSelectedOrder] = useState(null);
    const { mutate: shipOrder } = useShipOrder(refetch);

    // Debug selected order
    useEffect(() => {
        console.log("Selected Order:", selectedOrder);
    }, [selectedOrder]);

    if (isLoading || isError) return <LoadingSpiner />;

    // Badge colors
    const getStatusColor = (status) => {
        switch (status) {
            case "processing":
                return "bg-yellow-100 text-yellow-700";
            case "shipped":
                return "bg-blue-100 text-blue-700";
            case "delivered":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const handleShipSubmit = (e) => {
        e.preventDefault();
        const courierName = e.target.courierName.value;

        if (!selectedOrder) return;

        shipOrder({
            orderId: selectedOrder._id.toString(),
            courierName,
        });

        setSelectedOrder(null);
    };

    return (
        <div className="max-w-7xl mx-auto px-20 mt-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 py-5">
                 Order Management
            </h2>

            {/* Desktop Table */}
            <div className="hidden md:block">
                <table className="w-full   overflow-hidden shadow-sm">
                    <thead className="bg-green-500">
                        <tr className="text-left text-white">

                            <th className="p-3">Product</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Order Status</th>
                            <th className="p-3">Payment</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>

                    <tbody className="bg-green-50 ">
                        {orders?.map((order) => (
                            <tr
                                key={order._id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                            >

                                <td className="flex items-center gap-2">
                                    <img src={order.productImage} className="w-15 h-15 rounded" />
                                    {order.productName}
                                </td>
                                <td className="p-3">{order.userEmail}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded text-sm font-semibold ${getStatusColor(
                                            order.orderStatus
                                        )}`}
                                    >
                                        {order.orderStatus.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm font-semibold ${order.paymentStatus === "paid"
                                            ? "bg-green-100 text-green-800"
                                            : order.paymentStatus === "pending"
                                                ? "bg-orange-100 text-orange-800"
                                                : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                    </span>
                                </td>
                                <td className="p-3">{order.grandTotal} ৳</td>
                                <td className="p-3">
                                    {order.orderStatus === "processing" ? (
                                        <button
                                            type="button"
                                            onClick={() => setSelectedOrder(order)}
                                            className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition"
                                        >
                                            Mark as Shipped
                                        </button>
                                    ) : (
                                        <span className="text-green-600 font-semibold">
                                            {order.orderStatus.toUpperCase()}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="p-4 border rounded-lg shadow-sm bg-white"
                    >
                        <p>
                            <b>Order ID:</b> {order._id}
                        </p>
                        <p>
                            <b>Customer:</b> {order.userEmail}
                        </p>
                        <p className="mt-2">
                            <b>Status:</b>{" "}
                            <span
                                className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(
                                    order.orderStatus
                                )}`}
                            >
                                {order.orderStatus.toUpperCase()}
                            </span>
                        </p>
                        <p>

                            <span
                                className={`px-2 py-1 rounded-full text-sm font-semibold ${order.paymentStatus === "paid"
                                    ? "bg-green-100 text-green-800"
                                    : order.paymentStatus === "pending"
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                            </span>
                        </p>
                        <p>
                            <b>Total:</b> {order.grandTotal} ৳
                        </p>

                        {order.orderStatus === "processing" ? (
                            <button
                                type="button"
                                onClick={() => setSelectedOrder(order)}
                                className="mt-3 w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                            >
                                Mark as Shipped
                            </button>
                        ) : (
                            <p className="mt-2 text-green-600 font-bold">
                                {order.orderStatus.toUpperCase()}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 rounded border ${page === i + 1
                            ? "bg-orange-400 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Shipping Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white w-11/12 md:w-1/2 p-6 rounded-lg shadow-lg relative">
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-3 right-3 text-xl"
                        >
                            ✕
                        </button>

                        <h3 className="text-xl font-bold mb-4">Confirm Shipment</h3>

                        <form onSubmit={handleShipSubmit} className="space-y-4">
                            <div>
                                <label className="font-semibold">Courier Name</label>
                                <input
                                    type="text"
                                    name="courierName"
                                    placeholder="Sundarban, SA Paribahan..."
                                    className="input input-bordered w-full mt-1"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-full">
                                Confirm Shipment
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerOrders;
