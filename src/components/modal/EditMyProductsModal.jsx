import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCategories from "../../hooks/useCategories";
import LoadingSpiner from "../../pages/error pages/LoadingSpiner";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";


const EditMyProductsModal = ({ product, onClose }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { categories, isLoading, isError } = useCategories();
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(product?.image || "");
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: product?.name,
            category: product?.category,
            description: product?.description,
            quantity: product?.quantity,
            unit: product?.unit,
            price: product?.price,
            sellerDistrict: product?.seller?.district,
        },
    });


    // Update product
    const onSubmit = async (data) => {
        try {
            // Build updated product object
            const updatedProduct = {
                name: data.name,
                category: data.category,
                description: data.description,
                quantity: parseInt(data.quantity),
                unit: data.unit,
                price: parseFloat(data.price),
                image: imageUrl || product.image, // new image or existing

                // Seller Info
                seller: {
                    name: product.seller?.name || "Unknown Seller",
                    email: product.seller?.email || "unknown@example.com",
                    district: data.district || "Unknown",
                },

                // Authenticity
                productType: data.productType || product.productType || "Shop",
                origin: {
                    district: data.district || product.origin?.district || "Unknown",
                    village: data.originVillage || product.origin?.village || "",
                },
                sellerStory: data.sellerStory || product.sellerStory || "",

                // Verification & flags
                verificationStatus: product.verificationStatus || "pending",
                verifiedBy: product.verifiedBy || null,
                isAvailable: product.isAvailable ?? true,
                featured: product.featured ?? false,

                // Keep createdAt unchanged
                createdAt: product.createdAt,
            };

            // Call API
            const res = await axiosSecure.patch(`/products/${product._id}`, updatedProduct);

            if (res.data.modifiedCount > 0) {
                Swal.fire("✅ Product updated successfully!", "", "success");
                queryClient.invalidateQueries(["MyProducts"]); // refresh product list
                onClose();
            } else {
                Swal.fire("⚠️ No changes detected", "", "info");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("❌ Failed to update product", "", "error");
        }
    };


    // Upload image
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "react_upload");

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dmzln80je/image/upload",
                formData
            );
            setImageUrl(response.data.secure_url);
            Swal.fire("✅ Image Uploaded!", "", "success");

        } catch (error) {
            Swal.fire("❌ Image upload failed", "", error);
        } finally {
            setUploading(false);
        }
    };


    if (isLoading || isError) return <LoadingSpiner />;

    return (
        // <div className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center z-50">
        //     <div className="bg-white rounded-lg p-6 w-full max-w-7xl  relative">
        //         <button
        //             className="btn btn-sm btn-circle absolute right-2 top-2"
        //             onClick={onClose}
        //         >
        //             ✕
        //         </button>

        //         <h2 className="text-2xl font-semibold mb-4 text-center">
        //             Edit Product
        //         </h2>

        //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 shadow-lg  bg-white rounded-md">
        //             {/* ----------------- Product Details ----------------- */}
        //             <div className="bg-green-50 p-6 rounded-md">
        //                 <h3 className="text-md font-semibold mb-4 text-orange-500">Product Details</h3>
        //                 <div className="grid grid-cols-2 gap-6">
        //                     {/* Name */}
        //                     <div>
        //                         <label className="label-text font-medium">Product Name</label>
        //                         <input
        //                             type="text"
        //                             className="input input-bordered w-full focus:border-orange-400 focus:outline-0"
        //                             {...register("name", { required: "Product name is required" })}
        //                             defaultValue={product.name}
        //                         />
        //                         {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}
        //                     </div>

        //                     {/* Category */}
        //                     <div>
        //                         <label className="label-text font-medium">Category</label>
        //                         <select
        //                             className="select select-bordered w-full focus:border-orange-400 focus:outline-0"
        //                             {...register("category", { required: "Category is required" })}
        //                             defaultValue={product.category}
        //                         >
        //                             {categories?.map((cate) => (
        //                                 <option key={cate._id} value={cate.name}>
        //                                     {cate.name}
        //                                 </option>
        //                             ))}
        //                         </select>
        //                         {errors.category && <p className="text-error text-sm">{errors.category.message}</p>}
        //                     </div>

        //                     {/* Quantity */}
        //                     <div>
        //                         <label className="label-text font-medium">Quantity</label>
        //                         <input
        //                             type="number"
        //                             className="input input-bordered w-full focus:border-orange-400 focus:outline-0"
        //                             {...register("quantity", { required: "Quantity is required" })}
        //                             defaultValue={product.quantity}
        //                         />
        //                         {errors.quantity && <p className="text-error text-sm">{errors.quantity.message}</p>}
        //                     </div>

        //                     {/* Unit */}
        //                     <div>
        //                         <label className="label-text font-medium">Unit</label>
        //                         <select className="select select-bordered w-full focus:border-orange-400 focus:outline-0" {...register("unit")} defaultValue={product.unit}>
        //                             <option value="kg">Kilogram (kg)</option>
        //                             <option value="gm">Gram (gm)</option>
        //                             <option value="liter">Liter (L)</option>
        //                             <option value="ml">Milliliter (ml)</option>
        //                             <option value="piece">Piece</option>
        //                             <option value="dozen">Dozen</option>
        //                         </select>
        //                     </div>

        //                     {/* Price */}
        //                     <div>
        //                         <label className="label-text font-medium">Price (৳)</label>
        //                         <input
        //                             type="number"
        //                             className="input input-bordered w-full focus:border-orange-400 focus:outline-0"
        //                             {...register("price", { required: "Price is required" })}
        //                             defaultValue={product.price}
        //                         />
        //                         {errors.price && <p className="text-error text-sm">{errors.price.message}</p>}
        //                     </div>

        //                     {/* Product Image */}
        //                     <div>
        //                         <label className="label-text font-medium">Product Image</label>
        //                         <input
        //                             type="file"
        //                             accept="image/*"
        //                             className="file-input file-input-bordered w-full focus:border-orange-400 focus:outline-0"
        //                             onChange={handleImageUpload}
        //                         />
        //                         {uploading && <p className="text-blue-500 text-sm mt-1">Uploading...</p>}
        //                         {(imageUrl || product.image) && (
        //                             <img src={imageUrl || product.image} alt="Preview" className="w-32 h-32 object-cover mt-2 rounded-md" />
        //                         )}
        //                     </div>

        //                     {/* Description */}
        //                     <div className="col-span-2">
        //                         <label className="label-text font-medium">Description</label>
        //                         <textarea
        //                             className="textarea textarea-bordered w-full focus:border-orange-400 focus:outline-0"
        //                             rows={4}
        //                             {...register("description", { required: "Description is required" })}
        //                             defaultValue={product.description}
        //                         ></textarea>
        //                         {errors.description && <p className="text-error text-sm">{errors.description.message}</p>}
        //                     </div>
        //                 </div>
        //             </div>

        //             {/* ----------------- Product Authenticity ----------------- */}
        //             <div className="bg-green-50 p-6 rounded-md">
        //                 <h3 className="text-md font-semibold mb-4 text-orange-500">Product Authenticity</h3>
        //                 <div className="grid gap-4">
        //                     {/* Product Type */}
        //                     <div>
        //                         <select {...register("productType")} className="input input-bordered w-full" defaultValue={product.productType || ""}>
        //                             <option value="">Select Product Type</option>
        //                             <option value="Farm">Farm</option>
        //                             <option value="Handmade">Handmade</option>
        //                             <option value="Homemade">Homemade</option>
        //                             <option value="Shop">Shop</option>
        //                         </select>
        //                     </div>

        //                     {/* Origin Village */}
        //                     <div>
        //                         <input
        //                             type="text"
        //                             placeholder="Origin Village (optional)"
        //                             {...register("originVillage")}
        //                             className="input input-bordered w-full"
        //                             defaultValue={product.origin?.village || ""}
        //                         />
        //                     </div>

        //                     {/* Seller Story */}
        //                     <div>
        //                         <textarea
        //                             placeholder="Tell the story of this product"
        //                             {...register("sellerStory")}
        //                             className="textarea textarea-bordered w-full"
        //                             defaultValue={product.sellerStory || ""}
        //                         />
        //                     </div>
        //                 </div>
        //             </div>

        //             {/* ----------------- Seller Info ----------------- */}
        //             <div className="bg-green-50 p-6 rounded-md">
        //                 <h3 className="text-md font-semibold mb-4 text-orange-500">Seller Information</h3>
        //                 <div className="grid gap-4">
        //                     <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered w-full bg-gray-100" />
        //                     <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full bg-gray-100" />
        //                     <input
        //                         type="text"
        //                         placeholder="Seller District"
        //                         {...register("sellerDistrict", { required: "District is required" })}
        //                         className="input input-bordered w-full"
        //                         defaultValue={product.seller?.district || ""}
        //                     />
        //                 </div>
        //             </div>

        //             {/* ----------------- Submit ----------------- */}
        //             <div className="flex justify-end mt-4">
        //                 <button type="submit" className="btn btn-primary" disabled={uploading}>
        //                     {uploading ? "Uploading..." : "Update Product"}
        //                 </button>
        //             </div>
        //         </form>

        //     </div>
        // </div>
        <div className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-start pt-10 z-50 overflow-auto">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl relative p-6">

                {/* Close Button */}
                <button
                    className="btn btn-sm btn-circle absolute top-4 right-4 hover:bg-gray-200 transition"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Modal Title */}
                <h2 className="text-2xl font-semibold text-center text-orange-500 mb-6">
                    Edit Product
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* ----------------- Product Details ----------------- */}
                    <div className="bg-green-50 p-4 rounded-md shadow-sm">
                        <h3 className="text-md font-semibold mb-3 text-orange-500 flex items-center justify-between">
                            Product Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="label-text font-medium">Name</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full focus:border-orange-400 focus:outline-0"
                                    {...register("name", { required: "Product name is required" })}
                                    defaultValue={product.name}
                                />
                                {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="label-text font-medium">Category</label>
                                <select
                                    className="select select-bordered w-full focus:border-orange-400 focus:outline-0"
                                    {...register("category", { required: "Category is required" })}
                                    defaultValue={product.category}
                                >
                                    {categories?.map((cate) => (
                                        <option key={cate._id} value={cate.name}>
                                            {cate.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-error text-sm">{errors.category.message}</p>}
                            </div>

                            <div>
                                <label className="label-text font-medium">Quantity</label>
                                <input
                                    type="number"
                                    className="input input-bordered w-full focus:border-orange-400 focus:outline-0"
                                    {...register("quantity", { required: "Quantity is required" })}
                                    defaultValue={product.quantity}
                                />
                                {errors.quantity && <p className="text-error text-sm">{errors.quantity.message}</p>}
                            </div>

                            <div>
                                <label className="label-text font-medium">Unit</label>
                                <select className="select select-bordered w-full" {...register("unit")} defaultValue={product.unit}>
                                    <option value="kg">kg</option>
                                    <option value="gm">gm</option>
                                    <option value="liter">liter</option>
                                    <option value="ml">ml</option>
                                    <option value="piece">piece</option>
                                    <option value="dozen">dozen</option>
                                </select>
                            </div>

                            <div>
                                <label className="label-text font-medium">Price (৳)</label>
                                <input
                                    type="number"
                                    className="input input-bordered w-full focus:border-orange-400 focus:outline-0"
                                    {...register("price", { required: "Price is required" })}
                                    defaultValue={product.price}
                                />
                                {errors.price && <p className="text-error text-sm">{errors.price.message}</p>}
                            </div>

                            <div>
                                <label className="label-text font-medium">Product Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full"
                                    onChange={handleImageUpload}
                                />
                                {uploading && <p className="text-blue-500 text-sm mt-1">Uploading...</p>}
                                {(imageUrl || product.image) && (
                                    <img src={imageUrl || product.image} alt="Preview" className="w-24 h-24 object-cover mt-2 rounded-md" />
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="label-text font-medium">Description</label>
                                <textarea
                                    className="textarea textarea-bordered w-full focus:border-orange-400 focus:outline-0"
                                    rows={3}
                                    {...register("description", { required: "Description is required" })}
                                    defaultValue={product.description}
                                ></textarea>
                                {errors.description && <p className="text-error text-sm">{errors.description.message}</p>}
                            </div>

                        </div>
                    </div>

                    {/* ----------------- Product Authenticity ----------------- */}
                    <div className="bg-green-50 p-4 rounded-md shadow-sm">
                        <h3 className="text-md font-semibold mb-3 text-orange-500">Authenticity & Origin</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <select {...register("productType")} className="input input-bordered w-full" defaultValue={product.productType || ""}>
                                <option value="">Select Product Type</option>
                                <option value="Farm">Farm</option>
                                <option value="Handmade">Handmade</option>
                                <option value="Homemade">Homemade</option>
                                <option value="Shop">Shop</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Origin Village (optional)"
                                {...register("originVillage")}
                                className="input input-bordered w-full"
                                defaultValue={product.origin?.village || ""}
                            />

                            <textarea
                                placeholder="Seller Story"
                                {...register("sellerStory")}
                                className="textarea textarea-bordered w-full"
                                defaultValue={product.sellerStory || ""}
                            />
                        </div>
                    </div>

                    {/* ----------------- Seller Info ----------------- */}
                    <div className="bg-green-50 p-4 rounded-md shadow-sm">
                        <h3 className="text-md font-semibold mb-3 text-orange-500">Seller Info</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered w-full bg-gray-100" />
                            <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full bg-gray-100" />
                            <input
                                type="text"
                                placeholder="Seller District"
                                {...register("sellerDistrict", { required: "District is required" })}
                                className="input input-bordered w-full"
                                defaultValue={product.seller?.district || ""}
                            />
                        </div>
                    </div>

                    {/* ----------------- Submit Button ----------------- */}
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="btn btn-primary" disabled={uploading}>
                            {uploading ? "Uploading..." : "Update Product"}
                        </button>
                    </div>

                </form>
            </div>
        </div>

    );
};

export default EditMyProductsModal;
