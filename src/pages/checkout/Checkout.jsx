import { useNavigate, useParams, useSearchParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useProduct from "../../hooks/useProduct";
import { useForm } from "react-hook-form";
import UserInfoSection from "./UserInfoSection";
import ShippingInfo from './ShippingInfo';
import LoadingSpiner from "../error pages/LoadingSpiner";
import toast from 'react-hot-toast';
import CategoryBadge from "../../components/dashboard/userdashboard/categoryBadge/CategoryBadge";
import DisplayOrderProduct from "./displayOrderProduct";

const Checkout = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();
    const quantity = parseInt(searchParams.get("quantity") || 1);
    const navigate = useNavigate();

    const { product, productLoading, productError } = useProduct(id);

    const totalPrice = product?.price * quantity;
    const grandTotal = totalPrice + 60;


    const { register, handleSubmit, formState: { errors } } = useForm();

    // COD Order Submit
    const onSubmit = async (data) => {
        try {
            // If user selected Stripe → Don't run COD API
            if (data.paymentMethod === "STRIPE") {
                console.log("Stripe selected → COD order not created");
                return;
            }

            const orderInfo = {
                userEmail: user?.email,
                productId: product?._id,
                address: data.address,
                phone: data.phone,
                district: data.district,
                area: data.area,
                quantity,
                totalPrice,
                shippingCost: 60,
                grandTotal,
                sellerInfo: {
                    name: product?.seller?.name,
                    email: product?.seller?.email,
                    district: product?.seller?.district,
                },
                paymentMethod: "COD",
                paymentStatus: "Pending",
            };

            console.log("COD Order Info:", orderInfo);

            const res = await axiosSecure.post("/orders", orderInfo);

            if (res.data.success) {
                toast.success("Order placed successfully!");
                navigate(`/product/${product?._id}`)
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to place order");
        }
    };

    if (productLoading || productError) {
        return <LoadingSpiner />
    }

    return (
        <div className="">
            <CategoryBadge />
            <div className='bg-gray-100 min-h-screen'>
                <div className='max-w-7xl mx-auto md:flex gap-4 py-5'>

                    {/* left side  */}
                    <div className='mx-3 md:mx-0 md:w-4/6 p-10 bg-white '>
                        <UserInfoSection register={register} errors={errors} />
                    </div>

                    {/* right side */}
                    <div className='my-4 mx-3 md:mx-0 md:my-0 md:w-2/6 p-6 bg-white '>
                        <ShippingInfo
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            product={product}
                            quantity={quantity}
                        />
                    </div>

                </div>

                {/* display ordered Product  */}
                <div className="py-5 p-6 max-w-7xl mx-auto bg-white ">
                    <DisplayOrderProduct
                    product={product}            
                    quantity={quantity}
                />
                </div>
            </div>
        </div>
    );
};

export default Checkout;
