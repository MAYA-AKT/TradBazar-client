import React from 'react';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from 'react-router';
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from 'axios';
import districts from '../../../public/districts.json';
import SocialLogin from './SocialLogin';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { savedUserInDb } from '../../api/utils';
import useUserRole from '../../hooks/useUserRole';

const SignUp = () => {

    const { createUser, updateUserProfile } = useAuth();
    const { role } = useUserRole();
    console.log('role signUp', role);

    const navigate = useNavigate();
    const from = location.state?.from || '/';


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");


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




    const onSubmit = (data) => {
        setError("");
        data.photo = imageUrl;
        const { email, password, name, photo, district } = data;
        console.log(data);


        // create User
        createUser(email, password)
            .then(async (res) => {
                console.log(res);


                // update User Profile with photo , name
                const profileInfo = {
                    displayName: name,
                    photoURL: photo
                }
                updateUserProfile(profileInfo)
                    .then(() => {
                        alert('profile update')
                    }).catch((error) => {
                        console.log(error);

                    });
                toast.success("User Create SuccessFully");


                const userData = {
                    name,
                    email,

                    photo,
                    district
                }
                // update user from db
                await savedUserInDb(userData)

                if (role === 'admin') {
                    navigate('/admin-dashboard');
                }else{
                    navigate(from)
                }

            }).catch(err => {
                console.log(err);
                setError(err.message)
            })




        reset();
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
                <div className="w-full max-w-md bg-base-100 shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-center text-orange-500 mb-4">
                        Create Your Account
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="input input-bordered w-full"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <p className="text-error text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                                })}
                            />
                            {errors.email && (
                                <p className="text-error text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full pr-10"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Minimum 6 characters" },
                                    })}
                                />
                                <span
                                    className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </span>
                            </div>
                            {errors.password && (
                                <p className="text-error text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Profile Photo */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Profile Photo</span>
                            </label>

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



                            {errors.photo && (
                                <p className="text-error text-sm mt-1">{errors.photo.message}</p>
                            )}
                        </div>


                        {/* Address / District */}
                        <div>
                            <label className="label-text">District</label>
                            <select
                                {...register("district", { required: true })}
                                className="select select-bordered w-full hover:border-gray-400 focus:border-gray-500 focus:outline-none"
                            >
                                <option value="">Select your district</option>
                                {districts.map((district) => (
                                    <option key={district.id} value={district.name}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div>
                            <p className='text-sm text-red-500'>{error}</p>
                        </div>


                        {/* Submit */}
                        <button className="btn btn-primary w-full mt-4" type="submit">
                            Sign Up
                        </button>
                        <div className='flex justify-between text-sm -mt-2'>
                            <p className="text-center">
                                Already have an account?{" "}

                            </p>
                            <Link to="/signin" className="text-primary underline">
                                Sign in
                            </Link>
                        </div>

                        {/* Divider */}
                        <div className="divider text-sm">or</div>
                        {/* google login */}
                        <SocialLogin />

                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;