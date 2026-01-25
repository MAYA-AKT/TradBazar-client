import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import ShippingInfo from "./ShippingInfo";
import toast from "react-hot-toast";
import districts from "../../../public/districts.json";
import DisplayOrderProduct from "./displayOrderProduct";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import useSellerEarningsByDate from "../../hooks/useSellerEarningsByDate";
import { useTitle } from "../../hooks/useTitle";

const Checkout = () => {
    // dynamic title
    useTitle('Checkout');

    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [paymentMethod, setPaymentMethod] = useState("COD");


    const today = new Date();
    const month = today.getMonth() + 1; // JS months are 0-based
    const year = today.getFullYear();
    const { refetch } = useSellerEarningsByDate(user?.email, month, year);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const products = state?.products || [];



    if (!products.length) {
        return (
            <p className="text-center py-20 text-gray-500">
                No products selected for checkout.
            </p>
        );
    }

    const totalPrice = products?.reduce(
        (sum, p) => sum + p.price * p.quantity,
        0
    );
    const shippingCost = 60;
    const grandTotal = totalPrice + shippingCost;
    const onSubmit = async (data) => {
        try {
            if (paymentMethod === "STRIPE") {
                navigate("/payment", {
                    state: {
                        userEmail: user?.email,
                        products,
                        phone: data.phone,
                        address: data.address,
                        district: data.district,
                        area: data.area,
                        shippingCost,
                        grandTotal,
                    }
                });
                return;
            }
            const orders = products.map((p) => ({
                userEmail: user?.email,
                productId: p._id,
                quantity: p.quantity,
                totalPrice: p.price * p.quantity,
                shippingCost,
                grandTotal,
                address: data.address,
                phone: data.phone,
                district: data.district,
                area: data.area,
                sellerInfo: p.seller,
                paymentMethod: "COD",
                paymentStatus: "pending",
            }));
            // Send all orders to backend
            const res = await axiosSecure.post("/orders", { orders });
            refetch();

            if (res.data.success) {
                toast.success("Orders placed successfully!");
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to place order");
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-7xl mx-auto md:flex gap-4 py-5">

                {/* LEFT SIDE */}
                <div className="mx-3 md:mx-0 md:w-4/6 p-10 bg-white space-y-7 ">
                    <p className="text-gray-500">Billing Information : </p>
                    <hr className="text-gray-300 mb-10" />
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label>Full Name</label>
                            <input
                                className="input input-bordered focus:outline-none w-full bg-gray-100"
                                defaultValue={user?.displayName}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                className="input input-bordered focus:outline-none w-full bg-gray-100"
                                defaultValue={user?.email}
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Phone & District */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                        <div>
                            <label>Phone</label>
                            <input
                                {...register("phone", { required: "Phone is required" })}
                                className="input input-bordered focus:outline-none w-full"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm">{errors.phone.message}</p>
                            )}
                        </div>

                        <div>
                            <label>District</label>
                            <select
                                {...register("district", { required: "District is required" })}
                                className="select select-bordered focus:outline-none w-full"
                            >
                                <option value="">Select district</option>
                                {districts.map((d) => (
                                    <option key={d.id} value={d.name}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                            {errors.district && (
                                <p className="text-red-500 text-sm">{errors.district.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Address & Area */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                        <div>
                            <label>Address</label>
                            <input
                                {...register("address", { required: "Address is required" })}
                                className="input input-bordered focus:outline-none w-full"
                            />
                        </div>

                        <div>
                            <label>Area</label>
                            <input
                                {...register("area", { required: "Area is required" })}
                                className="input input-bordered focus:outline-none w-full"
                            />
                        </div>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-6">
                        <h3 className="font-semibold text-gray-800 mb-2">Order Instructions</h3>
                        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                            <li>Please review your billing and shipping details carefully before placing the order.</li>
                            <li>After confirmation, your order is reviewed and processed within <strong>24 hours</strong>.</li>
                            <li>Once shipped, you can track your order status anytime from the <strong>Order Tracking</strong> page.</li>
                            <li>Delivery usually takes <strong>2–5 working days</strong> depending on your location.</li>
                            <li>For handmade or authentic products, minor variations may naturally occur.</li>
                            <li>A tracking ID and order updates will be available after the order is confirmed.</li>
                        </ul>

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="md:w-2/6 p-6 bg-white ">
                    <ShippingInfo
                        products={products}
                        totalPrice={totalPrice}
                        shippingCost={shippingCost}
                        grandTotal={grandTotal}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />
                </div>
            </div>
            <div className="py-5 mt-4  max-w-7xl mx-auto">
                <h3 className="text-xl text-gray-700 mb-4">
                    Selected Products
                </h3>
                <div className=" bg-white mb-20 p-10">
                    <DisplayOrderProduct products={products} />
                </div>
            </div>

        </form>
    );
};

export default Checkout;
