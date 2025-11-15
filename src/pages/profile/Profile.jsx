import React from 'react';
import useAuth from '../../hooks/useAuth';

import useSignleUser from '../../hooks/useSignleUser';
import LoadingSpiner from '../error pages/LoadingSpiner';
import { NavLink } from 'react-router';
import useUserRole from '../../hooks/useUserRole';


const Profile = () => {
    const { user } = useAuth();
    const {role} = useUserRole();
    
    const { signleUser, isLoading, isError } = useSignleUser(user?.email);
    console.log(signleUser);


    if (isLoading || isError) {
        return <LoadingSpiner />
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-10 px-4">
                <div className="max-w-6xl mx-auto bg-white shadow-lg flex flex-col md:flex-row overflow-hidden">

                    {/* ✅ Left Sidebar */}
                    <div className="w-full md:w-1/4 bg-gray-50 p-6 mr-4">

                        <nav className="flex flex-col ">
                            
                            <NavLink

                                className="px-4 py-2 rounded-md hover:bg-orange-100 hover:text-orange-600 transition"
                            >
                                My Orders
                            </NavLink>
                            <NavLink
                                
                                className="px-4 py-2 rounded-md hover:bg-orange-100 hover:text-orange-600 transition"
                            >
                                Become a Seller
                            </NavLink>
                            <NavLink
                                
                                className="px-4 py-2 rounded-md hover:bg-orange-100 hover:text-orange-600 transition"
                            >
                                My Products
                            </NavLink>
                            <NavLink
                               
                                className="px-4 py-2 rounded-md hover:bg-orange-100 hover:text-orange-600 transition"
                            >
                                Account Settings
                            </NavLink>
                        </nav>
                    </div>

                    {/* ✅ Right Content Area */}
                    <div className="w-full md:w-3/4 p-8 bg-white">
                        <div className="flex gap-6 mb-6">
                            <div>
                                <img
                                    src={user?.photoURL || "https://via.placeholder.com/100"}
                                    alt="User Avatar"
                                    className="w-24 h-24 rounded-full border-4 border-orange-400 object-cover"
                                />
                                <p className="font-medium capitalize text-center text-orange-600">
                                    {role || "User"}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {user?.displayName || "Unknown User"}
                                </h2>
                                <p className="text-gray-600">{user?.email}</p>

                            </div>
                            <div
                                className={` text-sm font-medium ${signleUser?.sellerRequest?.status === "approved"
                                    ? "bg-green-100 text-green-800 border border-green-300"
                                    : signleUser?.sellerRequest?.status === "rejected"
                                        ? "bg-red-100 text-red-800 border border-red-300"
                                        : signleUser?.sellerRequest?.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                                            : ""
                                    }`}
                            >
                                {signleUser?.sellerRequest?.status === "approved"
                                    ? "✅ Your seller request has been approved. You can now add and manage your products."
                                    : signleUser?.sellerRequest?.status === "rejected"
                                        ? "❌ Your seller request was rejected. Please review and reapply."
                                        : signleUser?.sellerRequest?.status === "pending"
                                            ? "⏳ Your seller request is currently under review."
                                            : "👤 Regular User – Apply to become a seller to start selling products."}
                            </div>
                        </div>

                        {/* ✅ Additional Info Section */}
                        <div className=" p-6 ">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Account Details
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>
                                    <span className="font-medium">Phone:</span>{" "}
                                    {signleUser?.sellerRequest?.phone || "Not provided"}
                                </li>
                                <li>
                                    <span className="font-medium">District:</span>{" "}
                                    {signleUser?.sellerRequest?.district || "Not provided"}
                                </li>




                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
};

export default Profile;