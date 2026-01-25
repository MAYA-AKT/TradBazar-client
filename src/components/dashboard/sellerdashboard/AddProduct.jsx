import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useCategories from "../../../hooks/useCategories";
import LoadingSpiner from "../../../pages/error pages/LoadingSpiner";

import axios from "axios";
import { useTitle } from "../../../hooks/useTitle";


const AddProduct = () => {
  // dynamic title
    useTitle('Add Products');

    const { user } = useAuth();
    const { categories, isLoading, isError } = useCategories();
    const axiosSecure = useAxiosSecure();
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    //  upload photo to cloudinary, 
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        // Prepare form data
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "react_upload"); // Cloudinary preset


        axios.post(
            "https://api.cloudinary.com/v1_1/dmzln80je/image/upload",
            formData
        )
            .then(response => {
              
                setImageUrl(response.data.secure_url);
                setUploading(false);
            })
            .catch(error => {
                console.error("Upload error:", error);

            });
    };

    

    // ✅ Submit form handler
    const onSubmit = async (data) => {
        try {
            setUploading(true);

            data.image = imageUrl;


            const productData = {
                name: data.name,
                category: data.category,
                description: data.description,
                quantity: parseInt(data.quantity),
                unit: data.unit,
                price: parseFloat(data.price),
                image: data.image,

                // SELLER INFO
                seller: {
                    name: user?.displayName || "Unknown Seller",
                    email: user?.email,
                    district: data.sellerDistrict || "Unknown",
                },


                productType: data.productType,
                origin: {
                    district: data.sellerDistrict || "Unknown",
                    village: data.originVillage || ""
                },
                sellerStory: data.sellerStory || "",

                // VERIFICATION SYSTEM
                verificationStatus: "Pending",
                verifiedBy: null,

                // OTHER FLAGS
                isAvailable: true,
                featured: false,

                createdAt: new Date()
            };

            const res = await axiosSecure.post("/products", productData);

            if (res.data.insertedId) {
                toast.success("✅ Product added successfully!");
                reset();
            } else {
                toast.error("❌ Something went wrong!");
            }
        } catch (err) {
            console.error(err);
            toast.error("⚠️ Failed to add product");
        } finally {
            setUploading(false);
        }
    };


    if (isLoading || isError) {
        return <LoadingSpiner />
    }



    return (
        <div className="max-w-7xl mx-auto px-30  mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 py-5">
                Add New Product
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="">
                {/* Left side — Product info */}
                <div className="bg-green-50">
                    <h3 className="text-md font-semibold mb-2 text-orange-500 pt-3 pl-4">Product Details</h3>
                    <div className=" p-8">
                        <div className=" gap-6 grid grid-cols-2 ">
                            {/* Product Name */}
                            <div>
                                <label className="label-text font-medium">Product Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter product name"
                                    className="input input-bordered w-full focus:border-orange-400 focus:outline-0"
                                    {...register("name", { required: "Product name is required" })}
                                />
                                {errors.name && (
                                    <p className="text-error text-sm">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="label-text font-medium">Category</label>
                                <select
                                    className="select select-bordered w-full focus:border-orange-400 focus:outline-0"
                                    {...register("category", { required: "Category is required" })}
                                >
                                    {
                                        categories?.map((cate) => (
                                            <option key={cate._id} value={cate.name}>
                                                {cate.name}
                                            </option>
                                        ))
                                    }


                                </select>
                                {errors.category && (
                                    <p className="text-error text-sm">{errors.category.message}</p>
                                )}
                            </div>

                            {/* Quantity and Unit */}

                            <div>
                                <label className="label-text font-medium">Quantity</label>
                                <input
                                    type="number"
                                    placeholder="Enter quantity"
                                    className="input input-bordered w-full focus:border-orange-400 focus:outline-0"
                                    {...register("quantity", { required: "Quantity is required" })}
                                />
                                {errors.quantity && (
                                    <p className="text-error text-sm">{errors.quantity.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="label-text font-medium">Unit</label>
                                <select className="select select-bordered w-full focus:border-orange-400 focus:outline-0" {...register("unit")}>
                                    <option value="">Select unit</option>
                                    <option value="kg">Kilogram (kg)</option>
                                    <option value="gm">Gram (gm)</option>
                                    <option value="liter">Liter (L)</option>
                                    <option value="ml">Milliliter (ml)</option>
                                    <option value="piece">Piece</option>
                                    <option value="dozen">Dozen</option>
                                </select>
                            </div>


                            {/* Price */}
                            <div>
                                <label className="label-text font-medium">Price (৳)</label>
                                <input
                                    type="number"

                                    placeholder="Enter price"
                                    className="input input-bordered w-full focus:border-orange-400 focus:outline-0"
                                    {...register("price", { required: "Price is required" })}
                                />
                                {errors.price && (
                                    <p className="text-error text-sm">{errors.price.message}</p>
                                )}
                            </div>

                            {/* Image */}
                            <div>
                                <label className="label-text font-medium">Product Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full focus:border-orange-400 focus:outline-0"
                                    {...register("photo", { required: "Photo is required" })}
                                    onChange={handleImageUpload} // 🔥 upload to Cloudinary on select
                                />
                                {uploading && (
                                    <p className="text-sm text-blue-500 mt-1">Uploading image...</p>
                                )}
                                {/* {imageUrl && (
                            <img src={imageUrl} alt="plant image" />
                        )} */}
                            </div>

                        </div>
                        {/* Description */}
                        <div className="my-6 ">
                            <label className="label-text  font-medium">Product Description</label>
                            <textarea
                                placeholder="Write a short description..."
                                className="textarea textarea-bordered w-full focus:border-orange-400 focus:outline-0"
                                rows="4"
                                {...register("description", { required: "Description is required" })}
                            ></textarea>
                            {errors.description && (
                                <p className="text-error text-sm">{errors.description.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-10 ">
                    {/* authenticity */}
                    <div className=" bg-green-50">
                        <h3 className="text-md font-semibold mb-2 text-orange-500 pt-3 pl-4">Product Authenticity</h3>
                        <div className=" gap-4  space-y-6 p-10">
                            <div className="input input-bordered w-full border-1 focus:border-orange-400 focus:outline-0">
                                <select {...register("productType")} required className="">
                                    <option value="">Select Product Type</option>
                                    <option value="Farm">Farm</option>
                                    <option value="Handmade">Handmade</option>
                                    <option value="Homemade">Homemade</option>
                                    <option value="Shop">Shop</option>
                                </select>
                            </div>

                            <div className="input input-bordered w-full bg-gray-100">
                                <input
                                    type="text"
                                    placeholder="Origin Village (optional)"
                                    {...register("originVillage")}
                                    className="focus:border-orange-400 focus:outline-0"
                                />
                            </div>

                            <div className="">
                                <textarea
                                    placeholder="Tell the story of this product (who makes it, how)"
                                    {...register("sellerStory")}
                                    className="textarea textarea-bordered w-full focus:border-orange-400 focus:outline-0"
                                />

                            </div>
                        </div>
                    </div>

                    {/* Seller info */}
                    <div className="bg-green-50">
                        <h3 className="text-md font-semibold mb-2 text-orange-500 pt-3 pl-4">Seller Information</h3>
                        <div className=" p-12">
                            <div>
                                <label className=" text-gray-500"> Name</label>
                                <input
                                    type="text"
                                    value={user?.displayName || ""}
                                    readOnly
                                    className="input  w-full bg-gray-100  input-bordered focus:border-orange-400 focus:outline-0"
                                />
                            </div>
                            <div>
                                <label className="text-gray-500"> Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className="input input-bordered w-full bg-gray-100 focus:border-orange-400 focus:outline-0"
                                />
                            </div>
                            <div>
                                <label className="text-gray-500">District</label>
                                <input
                                    type="text"
                                    placeholder="Enter district"
                                    className="input input-bordered w-full focus:border-orange-400 focus:outline-0"
                                    {...register("sellerDistrict")}
                                />

                                {errors.name && (
                                    <p className="text-error text-sm">{errors.sellerDistrict.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Submit button (full width under both columns) */}
                <div className="md:col-span-2 mt-6">
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={uploading}
                    >
                        {uploading ? "Uploading..." : "Add Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
