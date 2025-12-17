
import { useNavigate } from "react-router";
import useProduct from "../../hooks/useProduct";
import { IoIosArrowRoundForward } from "react-icons/io";

const OrderItemCard = ({ order }) => {

    const { product, isLoading } = useProduct(order?.productId);
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center px-3 md:px-20">
            <div className="">
                <p className="font-semibold  mb-1">
                    Order ID: <span className="text-gray-500 text-sm">{order._id}</span>
                </p>
                <button
                    className="px-4 py-1 text-xs rounded bg-gray-100 border text-gray-700 mb-6"
                    disabled
                >
                    {order.orderStatus.toUpperCase()}
                </button>
                {isLoading ? (
                    <div className="w-20 h-20 rounded bg-gray-200 animate-pulse"></div>
                ) : (
                    <img
                        src={product?.image}
                        alt={product?.name}
                        className=" w-30 h-30 md:w-40 md:h-40  object-cover "
                    />
                )}


                <div className="mt-2">


                    <p className="font-semibold">{product?.name}</p>

                    <p className="text-sm text-gray-600">
                        Price: <span className="font-medium">{order.totalPrice} ৳</span>
                    </p>


                </div>
            </div>

            <div className="flex justify-center items-center md:text-xl mr-5">
                <button
                    className="btn"
                    onClick={() => navigate(`/track-order/${order._id}`)}
                >
                    Track My Order
                    <IoIosArrowRoundForward />
                </button>

            </div>



        </div>
    );
};

export default OrderItemCard;
