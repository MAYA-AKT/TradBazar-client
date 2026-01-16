import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useUpdateCartQuantity from "../../hooks/useUpdateCartQuantity";
import useDeleteCartItem from "../../hooks/useDeleteCartItem";
import CategoryBadge from "../../components/dashboard/userdashboard/categoryBadge/CategoryBadge";
import toast from "react-hot-toast";

const CartPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { data: cart = [], isLoading } = useCart(user?.email);
    console.log('cartItems', cart);


    const updateQty = useUpdateCartQuantity();
    const deleteItem = useDeleteCartItem();

    const [selectedItems, setSelectedItems] = useState([]);

    if (isLoading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    const selectedTotal = cart
        .filter(item => selectedItems.includes(item._id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);


    const handleSelectItem = (itemId) => {
        setSelectedItems((prev) =>
            prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
        );
    };

    const handleSelectAll = () => {
        if (selectedItems.length === cart.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cart.map((item) => item._id));
        }
    };


    const handleCheckout = () => {

        const productsToOrder = cart
            .filter((item) => selectedItems.includes(item._id))
            .map((item) => ({


                _id: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                seller: item.seller,
            }));

        if (productsToOrder.length === 0) {
            toast.error("Please select at least one product to proceed");
            return;
        }




        navigate("/checkout", {
            state: {
                products: productsToOrder,
            },
        });
    };


    return (
        <>
            <CategoryBadge />
            <div className="max-w-7xl mx-auto p-4">



                {cart.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">Your cart is empty</p>
                ) : (
                    <>

                        <div className="flex justify-between items-center mb-4 bg-white py-3 px-4 my-2">
                            <button
                                onClick={handleSelectAll}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 font-semibold rounded"
                            >
                                {selectedItems.length === cart.length ? "Deselect All" : "Select All"}
                            </button>
                            <span>{selectedItems.length} / {cart.length} selected</span>
                        </div>

                        <div className="gap-4 md:flex ">

                            <div className="md:w-4/6 space-y-2">
                                {cart.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex justify-between items-center p-4 bg-white shadow-sm"
                                    >

                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item._id)}
                                            onChange={() => handleSelectItem(item._id)}
                                            className="mr-3 w-5 h-5"
                                        />


                                        <div className="flex gap-4 items-center flex-1">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div className="pl-2">
                                                <p className="font-semibold text-lg">{item.name}</p>
                                                <p className="text-gray-500">Tk {item.price}</p>
                                                <div className="flex items-center gap-3 my-3">
                                                    <button
                                                        onClick={() =>
                                                            updateQty.mutate({ cartId: item._id, action: "dec" })
                                                        }
                                                        className="w-8 h-8 border rounded hover:bg-gray-100"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="font-semibold">{item.quantity}</span>
                                                    <button
                                                        onClick={() =>
                                                            updateQty.mutate({ cartId: item._id, action: "inc" })
                                                        }
                                                        className="w-8 h-8 border rounded hover:bg-gray-100"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>


                                        </div>


                                        <button
                                            onClick={() => deleteItem.mutate(item._id)}
                                            className="text-red-500 hover:text-red-700 ml-2 mr-4"
                                            title="Remove item"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>


                            <div className="md:w-2/6 bg-white mt-6 md:mt-0 p-7 shadow-sm h-fit">
                                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>Tk {selectedTotal}</span>
                                </div>

                                <div className="flex justify-between mb-2">
                                    <span>Shipping</span>
                                    <span>Tk {selectedTotal > 0 ? 60 : 0}</span>
                                </div>

                                <hr className="my-3" />

                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>
                                        Tk {selectedTotal > 0 ? selectedTotal + 60 : 0}
                                    </span>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold"
                                >
                                    Proceed to Checkout
                                </button>


                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartPage;
