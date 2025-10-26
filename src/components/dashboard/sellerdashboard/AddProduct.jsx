import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


const AddProduct = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [uploading, setUploading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // ✅ Upload image to Cloudinary
    const uploadImageToCloudinary = async (file) => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();
        return data.secure_url;
    };

    // ✅ Submit form handler
    const onSubmit = async (data) => {
        try {
            setUploading(true);

            const imageFile = data.image[0];
            const imageUrl = await uploadImageToCloudinary(imageFile);

            const productData = {
                name: data.name,
                category: data.category,
                description: data.description,
                quantity: parseInt(data.quantity),
                unit: data.unit,
                price: parseFloat(data.price),
                image: imageUrl,
                seller: {
                    name: user?.displayName || "Unknown Seller",
                    email: user?.email,
                    photo: user?.photoURL || "",
                    district: data.sellerDistrict || "Unknown",
                },
                status: "pending",
                dateAdded: new Date().toISOString(),
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

    return (
        <div className="max-w-5xl mx-auto p-8 bg-base-100 shadow-lg rounded-2xl mt-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-orange-500">
                Add New Product
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
                {/* Left side — Product info */}
                <div className="space-y-4">
                    {/* Product Name */}
                    <div>
                        <label className="label-text font-medium">Product Name</label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            className="input input-bordered w-full"
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
                            className="select select-bordered w-full"
                            {...register("category", { required: "Category is required" })}
                        >
                            <option value="">Select category</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Plants">Plants</option>
                            <option value="Handmade">Handmade</option>
                            <option value="Clothes">Clothes</option>
                        </select>
                        {errors.category && (
                            <p className="text-error text-sm">{errors.category.message}</p>
                        )}
                    </div>

                    {/* Quantity and Unit */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="label-text font-medium">Quantity</label>
                            <input
                                type="number"
                                placeholder="Enter quantity"
                                className="input input-bordered w-full"
                                {...register("quantity", { required: "Quantity is required" })}
                            />
                            {errors.quantity && (
                                <p className="text-error text-sm">{errors.quantity.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="label-text font-medium">Unit</label>
                            <select className="select select-bordered w-full" {...register("unit")}>
                                <option value="">Select unit</option>
                                <option value="kg">kg</option>
                                <option value="piece">piece</option>
                                <option value="liter">liter</option>
                            </select>
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="label-text font-medium">Price (৳)</label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Enter price"
                            className="input input-bordered w-full"
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
                            className="file-input file-input-bordered w-full"
                            {...register("image", { required: "Product image is required" })}
                        />
                        {errors.image && (
                            <p className="text-error text-sm">{errors.image.message}</p>
                        )}
                    </div>
                </div>

                {/* Right side — Seller info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Seller Information</h3>

                    {/* Seller Name */}
                    <div>
                        <label className="label-text font-medium">Seller Name</label>
                        <input
                            type="text"
                            value={user?.displayName || ""}
                            readOnly
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    {/* Seller Email */}
                    <div>
                        <label className="label-text font-medium">Seller Email</label>
                        <input
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    {/* Seller Photo */}
                    <div>
                        <label className="label-text font-medium">Seller Photo</label>
                        <div className="flex items-center gap-3">
                            <img
                                src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                                alt="Seller"
                                className="w-14 h-14 rounded-full border"
                            />
                            <p className="text-sm text-gray-500">Auto fetched from profile</p>
                        </div>
                    </div>

                    {/* Seller District */}
                    <div>
                        <label className="label-text font-medium">Seller District</label>
                        <input
                            type="text"
                            placeholder="Enter your district"
                            className="input input-bordered w-full"
                            {...register("sellerDistrict", { required: "District is required" })}
                        />
                        {errors.sellerDistrict && (
                            <p className="text-error text-sm">
                                {errors.sellerDistrict.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="label-text font-medium">Product Description</label>
                        <textarea
                            placeholder="Write a short description..."
                            className="textarea textarea-bordered w-full"
                            rows="4"
                            {...register("description", { required: "Description is required" })}
                        ></textarea>
                        {errors.description && (
                            <p className="text-error text-sm">{errors.description.message}</p>
                        )}
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
