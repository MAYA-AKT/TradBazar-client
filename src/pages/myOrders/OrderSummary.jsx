import { MapPin, Phone, CreditCard, PackageSearch } from "lucide-react";
import useProduct from "../../hooks/useProduct";
import LoadingSpiner from "../error pages/LoadingSpiner";

const OrderSummary = ({ order }) => {

    const { product, productLoading, productError } = useProduct(order?.productId);

    if (productLoading || productError) return <LoadingSpiner />;

    return (
        <div className="p-4">
            <div className="bg-white">
                <h2 className=" text-lg mb-4 pt-6 pb-4 text-center ">Order Summary</h2>


                <div className=" p-4 md:p-6 space-y-6">


                    <div className="flex gap-4 items-start">
                        <img
                            src={product?.image}
                            alt={product?.name}
                            className="w-24 h-24 object-cover"
                        />

                        <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-800">
                                {product?.name}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {product?.description}
                            </p>

                            <p className="text-sm text-gray-600 mt-2">
                                Quantity: <b>{order.quantity}</b>
                            </p>
                        </div>
                    </div>


                   


                    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">

                        <div>
                            <p className="text-sm text-gray-500">Payment Method</p>
                            <p className="font-semibold text-gray-800">
                                {order.paymentMethod}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-gray-500">Payment Status</p>
                            <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                ${order.paymentStatus === "Paid"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-orange-100 text-orange-700"
                                    }`}
                            >
                                {order.paymentStatus}
                            </span>
                        </div>

                    </div>



                   

                    {/* Price Summary */}
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Product Total</span>
                            <b>Tk {order.totalPrice}</b>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping Cost</span>
                            <b>Tk {order.shippingCost}</b>
                        </div>

                        <div className="flex justify-between text-lg font-semibold border-t pt-3 mt-3">
                            <span>Grand Total</span>
                            <span className="text-green-700">
                                Tk {order.grandTotal}
                            </span>
                        </div>
                    </div>
                </div>







            </div>
        </div>
    );
};

export default OrderSummary;
