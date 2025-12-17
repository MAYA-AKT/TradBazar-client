
import { Clock, Loader, Truck, CheckCircle } from "lucide-react";


const steps = [
    {
        key: "pending",
        label: "Pending",
        icon: Clock,
        text: "Your order has been received and is waiting for confirmation."
    },
    {
        key: "processing",
        label: "Processing",
        icon: Loader,
        text: "The seller is preparing your order for shipment."
    },
    {
        key: "shipped",
        label: "Shipped",
        icon: Truck,
        text: "Your package has been handed over to the courier and is on the way."
    },
    {
        key: "delivered",
        label: "Delivered",
        icon: CheckCircle,
        text: "Your order has been delivered successfully."
    }
];

const TrackOrderPage = ({ order }) => {






    return (
        <div className=" p-4">
            <div className="bg-white">
                <h1 className="mb-3 py-4 pl-4 text-center">Track My Order</h1>
            </div>

            
            <div className="bg-white shadow p-6">
                <p><b>Ordered On:</b> {new Date(order?.createdAt).toLocaleString()}</p>
                <hr className="text-gray-200 mb-6" />
                <div className="flex flex-col gap-10 relative">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const done = steps.findIndex(s => s.key === order?.orderStatus) >= index;

                        return (
                            <div key={step.key} className="flex items-start gap-4 relative">


                                {index !== steps.length - 1 && (
                                    <div className="absolute left-4 top-10 w-0.5 bg-gray-300 h-14"></div>
                                )}


                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center 
                                    ${done ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}
                                >
                                    <Icon size={30} />
                                </div>


                                <div>
                                    <p className={`text-xl ${done ? "text-green-700 font-semibold" : "text-gray-500"}`}>
                                        {step.label}
                                    </p>


                                    <p className="text-sm text-gray-600 mt-1">
                                        {step.text}
                                    </p>


                                    {done && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            {index === 0
                                                ? "Order Placed: " + new Date(order?.createdAt).toLocaleString()
                                                : index === 2 && order.shippedAt
                                                    ? "Shipped On: " + new Date(order?.shippedAt).toLocaleString()
                                                    : index === 3 && order.deliveredAt
                                                        ? "Delivered On: " + new Date(order?.deliveredAt).toLocaleString()
                                                        : ""}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>



        </div>
    );
};

export default TrackOrderPage;
