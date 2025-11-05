import React, { useEffect, useState } from 'react';
import SocialLogin from './SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { savedUserInDb } from '../../api/utils';
import useUserRole from '../../hooks/useUserRole';


const SignIn = () => {
    const { user, loading: authLoading ,signInUSer} = useAuth();
    const { role, isLoading: roleLoading } = useUserRole();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = (data) => {
        setError("");
        const { email, password } = data;


        signInUSer(email, password)
            .then(async (res) => {
                console.log(res);
                toast.success("User Login Successfully")

                const userData = {
                    name,
                    email,


                }
                // update user from db
                await savedUserInDb(userData)


            }).catch(err => {
                console.log(err);
                setError(err.message);
            })


        reset();
    };
    useEffect(() => {
        if (!authLoading && !roleLoading && user) {
            console.log("Redirecting user with role:", role);
            if (role === "admin") {
                navigate("/admin-dashboard");
            } else if(role === "seller"){
                navigate("/seller-dashboard")
            } 
            else {
                navigate(from);
            }
        }
    }, [user, role, authLoading, roleLoading, navigate, from]);
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
                <div className="w-full max-w-md bg-base-100 shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-center text-orange-500 mb-4">
                        Signin Your Account {name}
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


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



                        <div>
                            <p className='text-sm text-red-500'>{error}</p>
                        </div>



                        {/* Submit */}
                        <button className="btn btn-primary w-full mt-4" type="submit">
                            Sign In
                        </button>
                        <div className='flex justify-between text-sm -mt-2'>
                            <p className="text-center">
                                Don’t have an account?{" "}

                            </p>
                            <Link to="/signup" className="text-primary underline">
                                Sign up
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

export default SignIn;