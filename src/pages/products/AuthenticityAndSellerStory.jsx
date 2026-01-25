
import { useState } from "react";
import { FaMapMarkerAlt, FaUserCheck, FaLeaf, FaChevronDown, FaChevronUp } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { FaVideo } from "react-icons/fa";


const AuthenticityAndSellerStory = ({ product }) => {
    // dynamic title
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [open, setOpen] = useState(false);
    const { seller, origin, verificationStatus, verifiedBy, productType, } = product;
    const [question, setQuestion] = useState("");


    // handle ask seller


    const handleAskSeller = async () => {
        if (!question.trim()) {
            return toast.error("Please write your question");
        }

        const askData = {
            buyerEmail: user.email,
            sellerEmail: product.seller.email,
            productId: product._id,
            productName: product.name,
            question,
        };

        const res = await axiosSecure.post(
            "/notifications/ask-seller",
            askData
        );

        if (res.data.success) {
            toast.success("Question sent");
            setQuestion("");
        }
    };

    const handleVideoCall = async () => {
        const channelName = `product-${product._id}`;
        const uid = Math.floor(Math.random() * 100000);

        console.log("📞 Calling seller...");
        console.log("Channel:", channelName, "UID:", uid);

        await axiosSecure.post("/video-call/request", {
            buyerEmail: user.email,
            sellerEmail: product.seller.email,
            productId: product._id,
            channelName,
        });

        console.log("✅ Seller notified");

        const res = await axiosSecure.get(
            `/get-agora-token?channelName=${channelName}&uid=${uid}`
        );

        console.log("🎟 Agora token received");

        navigate(`/video-call/${channelName}`, {
            state: {
                token: res.data.token,
                uid,
            },
        });
    };




    if (!product) return null;



    return (
        <div className="bg-gray-100 max-w-7xl mx-auto ">
            <div className="space-y-8">
                {/* Seller Info & Product Authenticity */}
                <div className="flex relative flex-col md:flex-row   bg-white justify-between px-10 py-4">
                    <div className="">

                        <h2 className="text-lg md:text-xl font-semibold mb-6 border-b pb-2 text-gray-700">
                            Authenticity & Artisan Story
                        </h2>


                        {verificationStatus === "verified" && (
                            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded mb-6">
                                <FaUserCheck className="text-lg" />
                                <span className="text-sm font-medium">
                                    Verified Authentic Product (Approved by {verifiedBy || "Admin"})
                                </span>
                            </div>
                        )}


                        {origin && (
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-orange-500" />
                                    Product Origin
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Crafted in <span className="font-medium">{origin.village || "Unknown Village"}</span>,{" "}
                                    <span className="font-medium">{origin.district || "Unknown District"}</span>
                                </p>
                            </div>
                        )}


                        {seller && (
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <FaLeaf className="text-green-600" />
                                    Seller Information
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Artisan: <span className="font-medium">{seller.name}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Location: <span className="font-medium">{seller.district}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Product Type: <span className="font-medium">{productType}</span>
                                </p>
                            </div>
                        )}


                        <div className="mt-2">
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-2 text-orange-600 font-medium text-sm md:text-base hover:text-orange-500 transition"
                            >
                                Seller Story
                                {open ? <FaChevronUp /> : <FaChevronDown />}
                            </button>

                            {open && (
                                <p className="mt-3 text-gray-700 text-sm md:text-base leading-relaxed border-l-2 border-orange-300 pl-3">
                                    {product.sellerStory || "No seller story provided."}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="my-6">
                        {/* video call  */}

                        <button
                            onClick={handleVideoCall}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 font-bold
             text-white rounded hover:bg-green-600 hover:cursor-pointer">
                            <FaVideo className="text-lg" />
                            Request Live Product Preview
                        </button>
                        {/* end */}

                    </div>
                </div>

                {/* Buyer Ask Question */}
                <div className="bg-white shadow-md rounded-lg p-6">

                    <textarea
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 resize-none min-h-[100px]"
                        placeholder="Ask the seller (e.g., Is this 100% organic?)"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />

                    <button
                        onClick={handleAskSeller}
                        className="mt-4 w-full md:w-auto bg-orange-400 hover:bg-orange-500 transition text-white font-semibold px-6 py-2 rounded-lg hover:cursor-pointer"
                    >
                        Ask Seller
                    </button>
                </div>
            </div>


        </div>
    );
};

export default AuthenticityAndSellerStory;
