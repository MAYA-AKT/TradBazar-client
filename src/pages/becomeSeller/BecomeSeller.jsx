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
            // ✅ Handle user-not-found or other errors
            else if (err.response && err.response.status === 404) {
                toast.error("❌ Error", "User not found.");
            }
            // ✅ Generic error fallback
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
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            {/* Hero / Intro */}
            <div className="max-w-3xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Become a Seller
                </h1>
                <p className="text-gray-600 text-lg">
                    Join our platform to sell your products directly to customers,
                    reach a wider audience, and get fair prices for your hard work.
                    Share your traditional crafts, fresh produce, or homemade items today!
                </p>
            </div>

            {/* Benefits Section */}
            <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
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

            {/* Form Card */}
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 ">
                    Seller Registration Form
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                {...register("name")}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                {...register("email")}
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Phone & District */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register("phone", { required: "Phone number is required" })}
                                placeholder="Enter your phone number"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <label className="label-text">District</label>
                            <select
                                {...register("district", { required: true })}
                                className="select select-bordered w-full hover:border-gray-400 focus:border-gray-500 focus:outline-none"
                            >
                                <option value="">Select your district</option>
                                {districts.map((district) => (
                                    <option key={district.id} value={district.name}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                           
                            {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                        </div>

                    </div>

                    {/* Product Type & Source */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Type of Products</label>

                            <select
                                className="select select-bordered w-full"
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
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Selling Source</label>
                            <select
                                className="select select-bordered w-full"
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
    );
};

export default BecomeSeller;
