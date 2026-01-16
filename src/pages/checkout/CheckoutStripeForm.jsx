import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const CheckoutStripeForm = ({ orderData }) => {
    

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState("");

    // Create PaymentIntent
    useEffect(() => {
        if (!orderData?.grandTotal) return;

        axiosSecure.post("/create-payment-intent", {
            amount: orderData.grandTotal,
        })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
            .catch(err => {
                console.error("Intent Error:", err);
            });

    }, [orderData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) return;

        const card = elements.getElement(CardElement);

        // Confirm card payment
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: orderData?.userEmail || "",
                    phone: orderData?.phone || "",
                }
            }
        });

        if (error) {
            alert(error.message);
            return;
        }

        if (paymentIntent?.status === "succeeded") {


            const finalOrder = {
                ...orderData,
                paymentMethod: "STRIPE",
                paymentStatus: "paid",
                transactionId: paymentIntent.id,
            };

            console.log("Final Order Sending:", finalOrder);

            await axiosSecure.post("/orders", {
                orders: orderData.products.map(p => ({
                    userEmail: orderData.userEmail,
                    productId: p._id,
                    quantity: p.quantity,
                    totalPrice: p.price * p.quantity,
                    shippingCost: orderData.shippingCost,
                    grandTotal: orderData.grandTotal,
                    address: orderData.address,
                    phone: orderData.phone,
                    district: orderData.district,
                    area: orderData.area,
                    sellerInfo: p.seller,
                    paymentMethod: "STRIPE",
                    paymentStatus: "paid",
                    transactionId: paymentIntent.id
                }))
            });

             toast.success("Payment Successful");
             navigate('/');    
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="p-3 border rounded" />
            <button disabled={!stripe} className="btn bg-amber-500 text-white w-full mt-3">
                Pay Now
            </button>
        </form>
    );
};

export default CheckoutStripeForm;
