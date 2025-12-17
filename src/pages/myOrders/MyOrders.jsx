

import { useState } from "react";
import useUserOrders from "../../hooks/useUserOrders";
import OrderItemCard from "./OrderItemCard";
import useAuth from "../../hooks/useAuth";
import MyOrderLeft from "./MyOrderLeft";

const MyOrders = () => {

    const { user } = useAuth();
    const [page, setPage] = useState(1);

    const {
        orders,
        totalPages,
        isLoading,
        isError
    } = useUserOrders(user?.email, page, 10);

    if (isLoading) return <p>Loading your orders...</p>;
    if (isError) return <p>Failed to load orders</p>;

    return (
        <div >
            <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* LEFT SIDEBAR */}
                    <aside className="lg:col-span-1 hidden md:block">
                        <MyOrderLeft />
                    </aside>

                    {/* MAIN CONTENT */}
                    <main className="lg:col-span-3">

                        {/* TOTAL ORDERS */}
                        <div className="bg-white flex justify-between shadow  p-5 mb-6  border-1 border-gray-50">
                            <h2 className="text-xl md:text-xl ">
                                Your Cart items : <span className="text-primary">0</span>
                            </h2>
                            <button className="btn">Go To Cart</button>
                        </div>
                        <div className="bg-white shadow  p-5 mb-6  border-1 border-gray-50">
                            <h2 className="text-xl md:text-xl ">
                                Your Total Orders : <span className="text-primary">{orders.length}</span>
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Track and manage your past orders easily.
                            </p>
                        </div>

                        {/* ORDER LIST */}
                        <div className="space-y-4">
                            {orders.map(order => (
                                <OrderItemCard key={order._id} order={order} />
                            ))}
                        </div>

                        {/* PAGINATION */}
                        <div className="flex justify-center items-center mt-8 gap-4">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className="btn btn-outline"
                            >
                                Previous
                            </button>

                            <span className="px-4 py-2 bg-gray-100 rounded-lg border text-sm font-medium">
                                Page {page} of {totalPages}
                            </span>

                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                                className="btn btn-outline"
                            >
                                Next
                            </button>
                        </div>

                    </main>
                </div>
            </div>
        </div>

    );
};

export default MyOrders;
