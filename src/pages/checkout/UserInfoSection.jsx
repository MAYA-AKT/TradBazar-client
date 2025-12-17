import React from "react";
import useAuth from "../../hooks/useAuth";
import districts from '../../../public/districts.json';


const UserInfoSection = ({ register, errors }) => {
    const { user } = useAuth();







    return (
        <>

            <div className="pt-10">
                <div className="pb-5">
                    <h3 className="text-gray-500">Billing Information</h3>
                    <hr className="text-gray-300 mb-5 mt-2" />
                </div>
                <form className="space-y-4">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                {...register("name")}
                                defaultValue={user?.displayName}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                {...register("email")}
                                defaultValue={user?.email}
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Phone & District */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register("phone", { required: "Phone number is required" })}
                                placeholder="Enter your phone number"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">District</label>
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

                            {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                        </div>


                        {/* Address */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1"> Address</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register("address", { required: "Address is required" })}
                                placeholder="House, Road, Village/Block"
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                            )}
                        </div>

                        {/* Area */}
                        <div>
                            <label className=" block text-gray-700 font-medium mb-1">Area</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register("area", { required: "Area is required" })}
                                placeholder="Enter area (Example: Gulshan, Banani)"
                            />
                            {errors.area && (
                                <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>
                            )}
                        </div>



                    </div>




                </form>
            </div>

        </>
    );
};

export default UserInfoSection;
