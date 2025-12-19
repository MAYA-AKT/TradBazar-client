import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

const CartCheckoutPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { data: cart = [], isLoading } = useCart(user?.email);

    if (isLoading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    // 🔹 Group cart items by seller
    const groupedBySeller = cart.reduce((acc, item) => {
        const sellerEmail = item.seller?.email;

        if (!acc[sellerEmail]) {
            acc[sellerEmail] = {
                seller: item.seller,
                items: [],
            };
        }

        acc[sellerEmail].items.push(item);
        return acc;
    }, {});

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">
                Checkout (Seller Wise)
            </h2>

            {Object.keys(groupedBySeller).length === 0 ? (
                <p className="text-gray-500 text-center">
                    Your cart is empty
                </p>
            ) : (
                <div className="space-y-6">
                    {Object.values(groupedBySeller).map((group, index) => {
                        const subtotal = group.items.reduce(
                            (sum, item) =>
                                sum + item.price * item.quantity,
                            0
                        );

                        return (
                            <div
                                key={index}
                                className="border rounded-lg bg-white p-5"
                            >
                                {/* Seller Info */}
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold">
                                        Seller: {group.seller?.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {group.seller?.district}
                                    </p>
                                </div>

                                {/* Products */}
                                <div className="space-y-3">
                                    {group.items.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex justify-between items-center border-b pb-3"
                                        >
                                            <div className="flex gap-4 items-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 rounded object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="font-semibold">
                                                Tk {item.price * item.quantity}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Summary */}
                                <div className="flex justify-between mt-4 text-lg font-semibold">
                                    <span>Subtotal</span>
                                    <span>Tk {subtotal}</span>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/checkout/${group.items[0].productId}?quantity=${group.items[0].quantity}`
                                        )
                                    }
                                    className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
                                >
                                    Proceed to Checkout (Seller)
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CartCheckoutPage;
