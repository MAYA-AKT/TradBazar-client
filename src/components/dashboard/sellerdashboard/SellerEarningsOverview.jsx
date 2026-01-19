
import useAuth from "../../../hooks/useAuth";
import useSellerEarnings from "../../../hooks/useSellerEarnings";
import useSellerOrdersSummary from "../../../hooks/useSellerOrdersSummary";
import EarningsCalendar from "./EarningsCalendar";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineCash } from "react-icons/hi";
import { MdOutlinePendingActions } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { useTitle } from "../../../hooks/useTitle";


const EarningsOverview = () => {
  // dynamic title
    useTitle('Earnings Overview');

    const { user } = useAuth();
   
  
   

    const { data: earnings, isLoading } = useSellerEarnings();
    const { orders, isLoading: ordersLoading } = useSellerOrdersSummary(
        user?.email,
       
       
    );
  


  

    if (isLoading || ordersLoading) return <p>Loading...</p>;

    return (
        <div className="space-y-6 max-w-7xl mx-auto my-10">
            {/* SUMMARY */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Earnings Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* Total Orders */}
                <div className="bg-blue-100  p-4 shadow rounded flex items-center gap-4">
                    <BsBoxSeam className="text-5xl text-blue-500" />
                    <div className="">
                        <p className="text-md text-gray-600">Total Orders</p>
                        <h2 className="text-xl text-blue-500 font-bold">{earnings.totalOrders}</h2>
                    </div>
                </div>

                {/* Paid Earnings */}
                <div className="bg-green-100 p-4 shadow rounded flex items-center gap-4">
                    <HiOutlineCash className="text-5xl text-green-600" />
                    <div>
                        <p className="text-md text-gray-500">Paid Earnings</p>
                        <h2 className="text-xl font-bold text-green-600">
                            {earnings.paidEarnings}৳
                        </h2>
                    </div>
                </div>

                {/* Pending Earnings */}
                <div className="bg-orange-100 p-4 shadow rounded flex items-center gap-4">
                    <MdOutlinePendingActions className="text-5xl text-orange-500" />
                    <div>
                        <p className="text-md text-gray-500">Pending Earnings</p>
                        <h2 className="text-xl font-bold text-orange-500">
                            {earnings.pendingEarnings}৳
                        </h2>
                    </div>
                </div>

                {/* Total Earnings */}
                <div className="bg-purple-100 p-4 shadow rounded flex items-center gap-4">
                    <GiTakeMyMoney className="text-5xl text-purple-600" />
                    <div>
                        <p className="text-md text-gray-500">Total Earnings</p>
                        <h2 className="text-xl text-purple-600 font-bold">
                            {earnings.totalEarnings}৳
                        </h2>
                    </div>
                </div>

            </div>



            {/* calander */}
            <div>
                <EarningsCalendar />
            </div>


            {/* FILTER */}
            <div className="flex justify-between gap-2 pt-10">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h3>
                
            </div>

            {/* RECENT ORDERS */}
            <div className="max-w-3xl bg-blue-50">

                <div className="">
                    <table className="table ">
                        <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                            <tr>

                                <th>Product</th>
                                <th>Amount</th>
                                <th>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {orders?.map(order => (
                                <tr key={order._id}>

                                    <td>
                                        <img src={order.productImage} alt={order.productName} className="w-15 h-15 rounded mr-2 inline" />
                                        {order.productName}
                                    </td>
                                    <td>{order.grandTotal}৳</td>
                                    <td>
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

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
            </div>
        </div>
    );
};

export default EarningsOverview;
