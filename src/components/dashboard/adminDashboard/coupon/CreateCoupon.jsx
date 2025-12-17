import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const CreateCoupon = () => {
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        const couponInfo = {
            code: data.code.toUpperCase().trim(),  
            discount: Number(data.discount),
            type: data.type,
            minAmount: Number(data.minAmount),
            expired: false,                          
            createdAt: new Date().toISOString(),
        };

        try {
            const res = await axiosSecure.post("/coupons", couponInfo);

            if (res.data.success) {
                toast.success("Coupon created successfully!");
                reset();
            } else {
                toast.error(res.data.message || "Failed to create coupon");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Server error");
        }
    };

    return (
         <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded mt-10">
            <h2 className="text-2xl font-semibold mb-5 text-center">Add New Coupon</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                {/* Coupon Code */}
                <div>
                    <label className="block font-medium mb-1">Coupon Code</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="EX: NEWUSER20"
                        {...register("code", { required: "Coupon code is required" })}
                    />
                    {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
                </div>

                {/* Discount */}
                <div>
                    <label className="block font-medium mb-1">Discount</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="EX: 20"
                        {...register("discount", {
                            required: "Discount is required",
                            min: { value: 1, message: "Discount must be at least 1" }
                        })}
                    />
                    {errors.discount && (
                        <p className="text-red-500 text-sm">{errors.discount.message}</p>
                    )}
                </div>

                {/* Type */}
                <div>
                    <label className="block font-medium mb-1">Discount Type</label>
                    <select
                        className="select select-bordered w-full"
                        {...register("type", { required: "Select a type" })}
                    >
                        <option value="">Select</option>
                        <option value="percent">Percent (%)</option>
                        <option value="flat">Fixed Amount (৳)</option>
                    </select>
                    {errors.type && (
                        <p className="text-red-500 text-sm">{errors.type.message}</p>
                    )}
                </div>

              
                <div>
                    <label className="block font-medium mb-1">Minimum Order Amount</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="EX: 500"
                        {...register("minAmount", {
                            required: "Minimum amount is required",
                            min: { value: 0, message: "Amount cannot be negative" }
                        })}
                    />
                    {errors.minAmount && (
                        <p className="text-red-500 text-sm">{errors.minAmount.message}</p>
                    )}
                </div>

              
                <button className="btn btn-primary w-full" type="submit">
                    Create Coupon
                </button>
            </form>
        </div>
    );
};

export default CreateCoupon;
