// ShippingInfo.jsx
import React, { useState } from "react";

const ShippingInfo = ({ handleSubmit, onSubmit, product, quantity }) => {
    const shippingCost = 50; // Example flat shipping cost
    const totalPrice = product.price * quantity;
    const grandTotal = totalPrice + shippingCost;

    const [paymentMethod, setPaymentMethod] = useState("COD");


    return (
        <div className="p-6 bg-white shadow-md rounded-lg space-y-4">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

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
            <hr />
            <div className="flex justify-between font-bold text-lg">
                <p>Grand Total:</p>
                <p>{grandTotal}৳</p>
            </div>
            <div>
                <p className="font-medium mt-4">Payment Method</p>
                <label className="flex items-center gap-2 mt-2">
                    <input type="radio" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} />
                    Cash on Delivery
                </label>
                <label className="flex items-center gap-2 mt-2">
                    <input type="radio" checked={paymentMethod === "STRIPE"} onChange={() => setPaymentMethod("STRIPE")} />
                    Pay with Card (Stripe)
                </label>
            </div>
            <button
                onClick={handleSubmit((data) =>
                    onSubmit({ ...data, quantity, totalPrice, shippingCost, grandTotal, productId: product._id })
                )}
                className="btn w-full mt-4"
            >
                {paymentMethod === "COD" ? "Place Order (COD)" : "Pay Securely"}
            </button>
        </div>
    );
};

export default ShippingInfo;
