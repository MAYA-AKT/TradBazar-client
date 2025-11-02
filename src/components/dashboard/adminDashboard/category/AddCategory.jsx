import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import axios from 'axios';
import Swal from "sweetalert2";



const AddCategory = () => {

    const { register, handleSubmit, reset } = useForm();
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

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
                console.log("Uploaded image URL:", response.data.secure_url);
                setImageUrl(response.data.secure_url);
                setUploading(false);
            })
            .catch(error => {
                console.error("Upload error:", error);

            });
    };



    const onSubmit = async (data) => {
        data.image = imageUrl;
        try {
            const categoryData = {
                name: data.name,
                image: data.image,
                description: data.description,
                createdBy: user?.email,

            };


            // add category in db
            const res = await axiosSecure.post("/categories", categoryData);

            if (res.data.insertedId) {
                await Swal.fire({
                    title: "Success!",
                    text: "Category added successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                });

                reset();
            }

        } catch (error) {
            console.error(error);
            toast.error("❌ Failed to add category");
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-8"
            >
                <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
                    Add New Category
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Category Name */}
                    <div>
                        <label className="font-semibold text-gray-700 mb-1 block">
                            Category Name
                        </label>
                        <input
                            {...register("name", { required: true })}
                            placeholder="Enter category name"
                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="font-semibold text-gray-700 mb-1 block">
                            Description
                        </label>
                        <textarea
                            {...register("description")}
                            placeholder="Short description..."
                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 h-28 resize-none"
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        {...register("photo", { required: "Photo is required" })}
                        onChange={handleImageUpload} // 🔥 upload to Cloudinary on select
                    />
                    {uploading && (
                        <p className="text-sm text-blue-500 mt-1">Uploading image...</p>
                    )}
                    {imageUrl && (
                        <img src={imageUrl} alt="plant image" />
                    )}

                    {/* Submit Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition"
                    >
                        Add Category
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddCategory;