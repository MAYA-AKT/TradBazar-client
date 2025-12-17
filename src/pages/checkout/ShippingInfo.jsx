
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const ShippingInfo = ({ handleSubmit, onSubmit, product, quantity }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
   
    
    // const shippingCost = 60;
    const [shippingCost,setShippingCost] = useState(120);

    const totalPrice = product.price * quantity;

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [couponCode, setCouponCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState(null);

     const grandTotal = totalPrice + shippingCost - discountAmount;
    

    // Handle coupon apply
    const handleApplyCoupon = async () => {
        if (!couponCode) return toast.error("Please enter a coupon code");

        try {
            const res = await axiosSecure.post("/validate-coupon", {
                code: couponCode,
                totalAmount: totalPrice + shippingCost,
            });

            if (res.data.success) {
                setDiscountAmount(res.data.discountAmount);
                setAppliedCoupon(couponCode);
                toast.success("Coupon applied!");
            } else {
                setDiscountAmount(0);
                setAppliedCoupon(null);
                toast.error(res.data.message || "Invalid coupon");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to validate coupon");
        }
    };

    const handleOrderSubmit = (data) => {
        if(product?.seller?.district === data.district){
            setShippingCost(60);
        }
        const orderData = {
            userEmail: user?.email,
            productId: product?._id,
            quantity,
            totalPrice,
            shippingCost,
            discountAmount,
            grandTotal,
            couponCode: appliedCoupon,
            address: data.address,
            phone: data.phone,
            district: data.district,
            area: data.area,
            sellerInfo: {
                name: product?.seller?.name,
                email: product?.seller?.email,
                district: product?.seller?.district,
            },
        };

        if (paymentMethod === "COD") {
            onSubmit(orderData);
        } else {
            navigate("/payment", { state: orderData });
        }
    };

    return (
        <div className="p-2 rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-center text-gray-500">Order Summary</h3>
            {/* Coupon input */}
           
            <div className="flex gap-2 mt-8">
              
                <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="input input-bordered w-full focus:border-none"
                />
                <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="btn bg-blue-400 text-white"
                >
                    Apply
                </button>
            </div>
             <p className=" text-center -mt-2 mb-9 text-orange-400"> have a coupon? <span className="text-sm">Enter your code to get a discount.</span> </p>
            
            <div className="flex justify-between">
                <p>Quantity:</p>
                <p>{quantity}</p>
            </div>

            <div className="flex justify-between">
                <p>Unit Price:</p>
                <p>{product.price}৳</p>
            </div>

            <div className="flex justify-between">
                <p>Total Price:</p>
                <p>{totalPrice}৳</p>
            </div>

            <div className="flex justify-between">
                <p>Shipping Cost:</p>
                <p>{shippingCost}৳</p>
            </div>



            {discountAmount > 0 && (
                <div className="flex justify-between text-blue-600 font-medium">
                    <p>Discount :</p>
                    <p>-{discountAmount}৳</p>
                </div>
            )}

            <hr className="my-5 " />

            <div className="flex justify-between font-bold text-lg">
                <p>Grand Total:</p>
                <p>{grandTotal}৳</p>
            </div>

            <p className="font-medium mt-4 text-gray-500">Payment Method</p>

            <label className="flex items-center gap-2 mt-2">
                <input
                    type="radio"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                   
                />
                Cash On Delivery
            </label>

            <label className="flex items-center gap-2 mt-2">
                <input
                    type="radio"
                    
                    checked={paymentMethod === "STRIPE"}
                    onChange={() => setPaymentMethod("STRIPE")}
                />
                Pay with Card (Stripe)
            </label>

            <button
                onClick={handleSubmit(handleOrderSubmit)}
                className="btn w-full mt-4 btn-primary"
            >
                {paymentMethod === "COD" ? "Place Order (COD)" : "Pay Securely"}
            </button>
        </div>
    );
};

export default ShippingInfo;
