import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCategories from "../../hooks/useCategories";
import LoadingSpiner from "../../pages/error pages/LoadingSpiner";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";


const EditMyProductsModal = ({ product, onClose }) => {
    const axiosSecure = useAxiosSecure();
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

    // Update product
    const onSubmit = async (data) => {
        const updatedProduct = {
            name: data.name,
            category: data.category,
            description: data.description,
            quantity: parseInt(data.quantity),
            unit: data.unit,
            price: parseFloat(data.price),
            image: imageUrl || product.image,
            seller: {
                name: product.seller?.name,
                email: product.seller?.email,
                district: data.sellerDistrict,
            },
        };

        try {
            const res = await axiosSecure.patch(`/products/${product._id}`, updatedProduct);
            if (res.data.modifiedCount > 0) {
                Swal.fire("✅ Product updated successfully!", "", "success");
               queryClient.invalidateQueries(["MyProducts"]);  
                onClose();
            } else {
                Swal.fire("⚠️ No changes detected", "", "info");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("❌ Failed to update product", "", "error");
        }
    };

    if (isLoading || isError) return <LoadingSpiner />;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative">
                <button
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Edit Product
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-7 shadow-2xl">
                    {/* Name & Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label-text">Product Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <p className="text-error text-sm">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="label-text">Category</label>
                            <select
                                className="select select-bordered w-full"
                                {...register("category", { required: "Category is required" })}
                            >
                                {categories?.map((cate) => (
                                    <option key={cate._id} value={cate.name}>
                                        {cate.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Quantity, Unit, Price */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="label-text">Quantity</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                {...register("quantity", { required: "Quantity is required" })}
                            />
                        </div>

                        <div>
                            <label className="label-text">Unit</label>
                            <select className="select select-bordered w-full" {...register("unit")}>
                                <option value="kg">kg</option>
                                <option value="gm">gm</option>
                                <option value="liter">liter</option>
                                <option value="ml">ml</option>
                                <option value="piece">piece</option>
                                <option value="dozen">dozen</option>
                            </select>
                        </div>

                        <div>
                            <label className="label-text">Price (৳)</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                {...register("price", { required: "Price is required" })}
                            />
                        </div>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="label-text">Product Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="file-input file-input-bordered w-full"
                            onChange={handleImageUpload}
                        />
                        {uploading && (
                            <p className="text-blue-500 text-sm mt-1">Uploading...</p>
                        )}
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="w-32 h-32 object-cover mt-2 rounded-md"
                            />
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="label-text">Description</label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows="3"
                            {...register("description", { required: "Description is required" })}
                        ></textarea>
                    </div>

                    {/* Seller District */}
                    <div>
                        <label className="label-text">Seller District</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            {...register("sellerDistrict", { required: "District is required" })}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={onClose} className="btn btn-outline btn-error">
                            Cancel
                        </button>
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
