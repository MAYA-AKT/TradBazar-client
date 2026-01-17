import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCategories from "../../hooks/useCategories";
import districts from '../../../public/districts.json';
import toast from "react-hot-toast";
import LoadingSpiner from '../../pages/error pages/LoadingSpiner';



const BecomeSeller = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { categories, isLoading, isError } = useCategories();

    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.displayName || "",
            email: user?.email || "",

        },
    });


    const onSubmit = async (data) => {
        console.log('seller data', data);

        setSubmitting(true);
        try {
            const res = await axiosSecure.post("/sellers/request", {
                ...data,

            });

            if (res.status === 200 && res.data.success) {
                toast.success(res.data.message);
                reset();
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 400) {
                toast("ℹ️ Already Submitted", err.response.data.message, "info");
            }

            else if (err.response && err.response.status === 404) {
                toast.error("❌ Error", "User not found.");
            }

            else {
                toast.error("❌ Error", "Something went wrong. Please try again.", "error");
            }
        } finally {
            setSubmitting(false);
        }
    };


    if (isLoading || isError) {
        return <LoadingSpiner />
    }


    return (
        <div className="max-w-7xl mx-auto mt-20">

            <div className="">
                <div className="">
                    <div className="mb-10 ">
                        <h1 className="text-2xl text-center font-bold text-gray-800 mb-4">
                            Join as a Local Seller & Grow Your Business
                        </h1>
                        <p className="text-gray-600 text-lg text-center">
                            Join our platform to sell your products directly to customers,
                            reach a wider audience, and get fair prices for your hard work.
                            Share your traditional crafts, fresh produce, or homemade items today!
                        </p>
                    </div>


                    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white shadow rounded-lg p-6 text-center">
                            <h3 className="font-semibold text-lg mb-2">Direct Customers</h3>
                            <p className="text-gray-500 text-sm">
                                Sell your products directly without intermediaries.
                            </p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6 text-center">
                            <h3 className="font-semibold text-lg mb-2">Fair Pricing</h3>
                            <p className="text-gray-500 text-sm">
                                Get fair prices for your produce and crafts.
                            </p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6 text-center">
                            <h3 className="font-semibold text-lg mb-2">Wider Reach</h3>
                            <p className="text-gray-500 text-sm">
                                Reach buyers across your district or city.
                            </p>
                        </div>
                    </div>
                </div>
                <section className=" mt-20">
                    <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">
                        How Selling on Our Platform Works
                    </h2>

                    <div className="relative border-l-2 border-green-500 ml-6 space-y-10">

                        {/* Step 1 */}
                        <div className="ml-6">
                            <span className="absolute -left-3 w-6 h-6 bg-green-500 rounded-full"></span>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Apply as a Seller
                            </h3>
                            <p className="text-gray-600 mt-1">
                                Fill out the seller registration form with your product details and source.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="ml-6">
                            <span className="absolute -left-3 w-6 h-6 bg-green-500 rounded-full"></span>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Admin Review & Verification
                            </h3>
                            <p className="text-gray-600 mt-1">
                                Our admin verifies your information to ensure quality and authenticity.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="ml-6">
                            <span className="absolute -left-3 w-6 h-6 bg-green-500 rounded-full"></span>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Add Your Products
                            </h3>
                            <p className="text-gray-600 mt-1">
                                Upload products with images, prices, and stock quantity.
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="ml-6">
                            <span className="absolute -left-3 w-6 h-6 bg-green-500 rounded-full"></span>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Receive Orders & Earnings
                            </h3>
                            <p className="text-gray-600 mt-1">
                                Get notified for orders and receive payments securely.
                            </p>
                        </div>

                    </div>
                </section>

                {/*  */}
                <div className="mt-20">
                    <h2 className="text-xl font-bold text-center mb-8 text-gray-800">
                        Why Choose Our Platform
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">


                        <div className="flex flex-col items-center text-center px-4">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-3">
                                ✓
                            </div>
                            <h3 className="font-semibold text-lg mb-1">Verified Sellers</h3>
                            <p className="text-gray-600 text-sm">
                                Every seller is verified by our admin team.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center px-4 border-l sm:border-l-0 sm:border-x border-gray-200">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-3">
                                🔒
                            </div>
                            <h3 className="font-semibold text-lg mb-1">Secure Payments</h3>
                            <p className="text-gray-600 text-sm">
                                Payments are handled securely through trusted gateways.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center px-4">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-3">
                                🌱
                            </div>
                            <h3 className="font-semibold text-lg mb-1">Local Focus</h3>
                            <p className="text-gray-600 text-sm">
                                Promoting local producers and traditional businesses.
                            </p>
                        </div>

                    </div>

                </div>

                <div className="bg-orange-50  flex items-center px-20 mt-20 mb-8">
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-green-800 mb-3">
                            Who Can Become a Seller?
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Farmers selling fresh fruits, vegetables, or crops</li>
                            <li>Home-based sellers offering homemade food or crafts</li>
                            <li>Local shop owners with traditional or handmade products</li>
                            <li>Must provide valid contact and location information</li>
                        </ul>
                    </div>
                    <div className="flex-1">


                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8  ">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 ">
                                Seller Registration Form
                            </h2>
                            {/* Name & Email */}
                            <div className="">
                                <div className="my-6">
                                    <label className="block  mb-2">Name</label>
                                    <input
                                        type="text"
                                        className=" text-gray-600  w-full pl-1 border-b-1  border-orange-500 focus:outline-0 cursor-not-allowed"
                                        {...register("name")}
                                        readOnly
                                    />
                                </div>
                                <div className="my-6">
                                    <label className="block mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="text-gray-600 pl-1 border-b-1  border-orange-500 focus:outline-0  w-full  cursor-not-allowed"
                                        {...register("email")}
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* Phone & District */}
                            <div className="">
                                <div className="my-6">
                                    <label className="block  mb-2">Phone Number</label>
                                    <input
                                        type="text"
                                        className="text-gray-600 pl-1 border-b-1  border-orange-500 focus:outline-0  w-full"
                                        {...register("phone", { required: "Phone number is required" })}
                                        placeholder="Enter your phone number"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                                </div>

                                <div className="my-6">
                                    <label className="label-text mb-2">District</label>
                                    <select
                                        {...register("district", { required: true })}
                                        className="text-gray-600 w-full  pl-1 border-b-1  border-orange-500 focus:outline-0 "
                                    >
                                        <option value="">Select your district</option>
                                        {districts.map((district) => (
                                            <option key={district.id} value={district.name}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.district && <p className="text-red-500 text-sm mt-2">{errors.district.message}</p>}
                                </div>

                            </div>

                            {/* Product Type & Source */}
                            <div className="">
                                <div className="my-6">
                                    <label className="block text-gray-700  mb-2">Type of Products</label>

                                    <select
                                        className="text-gray-600 pl-1 border-b-1 w-full  border-orange-500 focus:outline-0 "
                                        {...register("productType", { required: "Specify product type" })}
                                    >
                                        {
                                            categories?.map((cate) => (
                                                <option key={cate._id} value={cate.name}>
                                                    {cate.name}
                                                </option>
                                            ))
                                        }


                                    </select>
                                    {errors.productType && <p className="text-red-500 text-sm mt-1">{errors.productType.message}</p>}
                                </div>
                                <div className="my-6">
                                    <label className="block text-gray-700 mb-2">Selling Source</label>
                                    <select
                                        className="text-gray-600 pl-1 border-b-1 border-orange-500 focus:outline-0 w-full"
                                        {...register("source", { required: "Select your selling source" })}
                                    >
                                        <option value="">Select source</option>
                                        <option value="Farm">Farm / Garden</option>
                                        <option value="Home">Home-made / Handicraft</option>
                                        <option value="Shop">Small Shop / Store</option>
                                    </select>
                                    {errors.source && <p className="text-red-500 text-sm mt-1">{errors.source.message}</p>}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                    disabled={submitting}
                                >
                                    {submitting ? "Submitting..." : "Submit Request"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default BecomeSeller;
