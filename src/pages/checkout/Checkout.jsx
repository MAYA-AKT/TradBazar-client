import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import ShippingInfo from "./ShippingInfo";
import toast from "react-hot-toast";
import districts from "../../../public/districts.json";
import DisplayOrderProduct from "./displayOrderProduct";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Checkout = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const products = state?.products || [];
    console.log('products',products);
    

    if (!products.length) {
        return (
            <p className="text-center py-20 text-gray-500">
                No products selected for checkout.
            </p>
        );
    }

    const totalPrice = products.reduce(
        (sum, p) => sum + p.price * p.quantity,
        0
    );
    const shippingCost = 60;
    const grandTotal = totalPrice + shippingCost;
    const onSubmit = async (data) => {
        try {
           
            const orders = products.map((p) => ({
                userEmail: user?.email,
                productId: p._id,
                quantity: p.quantity,
                totalPrice: p.price * p.quantity,
                shippingCost,
                grandTotal: p.price * p.quantity + shippingCost,
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
                <div className="mx-3 md:mx-0 md:w-4/6 p-10 bg-white space-y-4">

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label>Full Name</label>
                            <input
                                className="input input-bordered w-full bg-gray-100"
                                defaultValue={user?.displayName}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                className="input input-bordered w-full bg-gray-100"
                                defaultValue={user?.email}
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Phone & District */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label>Phone</label>
                            <input
                                {...register("phone", { required: "Phone is required" })}
                                className="input input-bordered w-full"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm">{errors.phone.message}</p>
                            )}
                        </div>

                        <div>
                            <label>District</label>
                            <select
                                {...register("district", { required: "District is required" })}
                                className="select select-bordered w-full"
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label>Address</label>
                            <input
                                {...register("address", { required: "Address is required" })}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div>
                            <label>Area</label>
                            <input
                                {...register("area", { required: "Area is required" })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="md:w-2/6 p-6 bg-white">
                    <ShippingInfo
                        products={products}
                        totalPrice={totalPrice}
                        shippingCost={shippingCost}
                        grandTotal={grandTotal}
                    />
                </div>
            </div>
            <div className="py-5 p-6 max-w-7xl mx-auto bg-white ">
                <DisplayOrderProduct products={products} />
            </div>
        </form>
    );
};

export default Checkout;








// import { useNavigate, useParams, useSearchParams } from "react-router";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useProduct from "../../hooks/useProduct";
// import { useForm } from "react-hook-form";
// import UserInfoSection from "./UserInfoSection";
// import ShippingInfo from './ShippingInfo';
// import LoadingSpiner from "../error pages/LoadingSpiner";
// import toast from 'react-hot-toast';
// import CategoryBadge from "../../components/dashboard/userdashboard/categoryBadge/CategoryBadge";
// import DisplayOrderProduct from "./displayOrderProduct";

// const Checkout = () => {
//     const { user } = useAuth();
//     const { id } = useParams();
//     const axiosSecure = useAxiosSecure();
//     const [searchParams] = useSearchParams();
//     const quantity = parseInt(searchParams.get("quantity") || 1);
//     const navigate = useNavigate();

//     const { product, productLoading, productError } = useProduct(id);

//     const totalPrice = product?.price * quantity;
//     const grandTotal = totalPrice + 60;


//     const { register, handleSubmit, formState: { errors } } = useForm();

//     // COD Order Submit
//     const onSubmit = async (data) => {
//         try {
//             // If user selected Stripe → Don't run COD API
//             if (data.paymentMethod === "STRIPE") {
//                 console.log("Stripe selected → COD order not created");
//                 return;
//             }

//             const orderInfo = {
//                 userEmail: user?.email,
//                 productId: product?._id,
//                 address: data.address,
//                 phone: data.phone,
//                 district: data.district,
//                 area: data.area,
//                 quantity,
//                 totalPrice,
//                 shippingCost: 60,
//                 grandTotal,
//                 sellerInfo: {
//                     name: product?.seller?.name,
//                     email: product?.seller?.email,
//                     district: product?.seller?.district,
//                 },
//                 paymentMethod: "COD",
//                 paymentStatus: "Pending",
//             };

//             console.log("COD Order Info:", orderInfo);

//             const res = await axiosSecure.post("/orders", orderInfo);

//             if (res.data.success) {
//                 toast.success("Order placed successfully!");
//                 navigate(`/product/${product?._id}`)
//             }
//         } catch (err) {
//             console.error(err);
//             alert(err.response?.data?.message || "Failed to place order");
//         }
//     };

//     if (productLoading || productError) {
//         return <LoadingSpiner />
//     }

//     return (
//         <div className="">
//             <CategoryBadge />
//             <div className='bg-gray-100 min-h-screen'>
//                 <div className='max-w-7xl mx-auto md:flex gap-4 py-5'>

//                     {/* left side  */}
//                     <div className='mx-3 md:mx-0 md:w-4/6 p-10 bg-white '>
//                         <UserInfoSection register={register} errors={errors} />
//                     </div>

//                     {/* right side */}
//                     <div className='my-4 mx-3 md:mx-0 md:my-0 md:w-2/6 p-6 bg-white '>
//                         <ShippingInfo
//                             handleSubmit={handleSubmit}
//                             onSubmit={onSubmit}
//                             product={product}
//                             quantity={quantity}
//                         />
//                     </div>

//                 </div>

//                 {/* display ordered Product  */}
//                 <div className="py-5 p-6 max-w-7xl mx-auto bg-white ">
//                     <DisplayOrderProduct
//                     product={product}
//                     quantity={quantity}
//                 />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Checkout;
