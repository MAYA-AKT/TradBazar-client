import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutStripeForm from "./CheckoutStripeForm";
import LoadingSpiner from "../error pages/LoadingSpiner";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const StripePaymentPage = () => {

    const { state: orderData } = useLocation();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");


    useEffect(() => {
        if (!orderData?.grandTotal) return;

        axiosSecure
            .post("/create-payment-intent", {
                amount: orderData.grandTotal,
            })
            .then((res) => {
                setClientSecret(res.data.clientSecret);
            })
            .catch((err) => console.log(err));
    }, [orderData]);

    if (!orderData || !clientSecret) return <LoadingSpiner />;


    return (
        <div className=" flex  justify-center items-center p-3 md:p-0 ">
            <div className="bg-white shadow-lg rounded-lg max-w-xl w-full p-9 mt-10 md:mt-20 ">
                <h2 className="text-xl font-bold mb-4 text-center pb-6">Complete Your Payment</h2>

                <Elements
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >
                    <CheckoutStripeForm orderData={orderData} clientSecret={clientSecret} />
                </Elements>
            </div>
        </div>


    );
};

export default StripePaymentPage;
