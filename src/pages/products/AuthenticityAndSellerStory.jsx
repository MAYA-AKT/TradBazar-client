
import { useState } from "react";
import { FaMapMarkerAlt, FaUserCheck, FaLeaf, FaChevronDown, FaChevronUp } from "react-icons/fa";

const AuthenticityAndSellerStory = ({ product }) => {

    const [open, setOpen] = useState(false);
    const { seller, origin, verificationStatus, verifiedBy, productType, } = product;

    if (!product) return null;



    return (
        <div className="bg-gray-100 ">
            <div className=" max-w-7xl mx-auto ">
              {/* Section Title */}
                    <h2 className="md:text-xl mb-4 ml-2">
                        Authenticity & Artisan Story
                    </h2>
                <div className=" bg-white  p-6 mt-6">
                  

                    {/* Verification Badge */}
                    {verificationStatus === "verified" && (
                        <div className="  flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded mb-5">
                            <FaUserCheck />
                            <span className="text-sm font-medium">
                                Verified Authentic Product (Approved by {verifiedBy || "Admin"})
                            </span>
                        </div>
                    )}

                    {/* Origin Info */}
                    {origin && (
                        <div className="mb-5">
                            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-orange-500" />
                                Product Origin
                            </h3>
                            <p className="text-sm text-gray-600">
                                Crafted in <span className="font-medium">{origin.village}</span>,{" "}
                                <span className="font-medium">{origin.district}</span>
                            </p>
                        </div>
                    )}

                    {/* Seller Info */}
                    {seller && (
                        <div className="mb-5">
                            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <FaLeaf className="text-green-600" />
                                Seller Information
                            </h3>
                            <p className="text-sm text-gray-600">
                                Artisan: <span className="font-medium">{seller.name}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Location: {seller.district}
                            </p>
                            <p className="text-sm text-gray-600">
                                Product Type:{" "}
                                <span className="font-medium">{productType}</span>
                            </p>
                        </div>
                    )}

                    {/* Seller Story */}

                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 text-orange-600 text-sm font-medium"
                    >
                        Seller Story
                        {open ? <FaChevronUp /> : <FaChevronDown />}
                    </button>

                    {open && (
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                            {product.sellerStory} by Rahima Begum, a rural artisan from Jamalpur. Each piece takes 10–15 days to complete and reflects traditional Bengali cultu
                        </p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AuthenticityAndSellerStory;
