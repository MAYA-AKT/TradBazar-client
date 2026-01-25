import React from 'react';
import useAuth from '../../hooks/useAuth';
import useUserRole from '../../hooks/useUserRole';
import LoadingSpiner from '../../pages/error pages/LoadingSpiner';
import { RxDashboard } from "react-icons/rx";
import { FiUser, FiLogOut } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdStorefront } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from 'react-router';
import toast from 'react-hot-toast';


const ProfileDropdown = () => {
    const { user,logOut } = useAuth();
    const { role, isLoading, isError } = useUserRole();


    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("User log OUt");

            }).catch(err => {
                console.log(err);

            })
    }


    if (isLoading || isError) {
        return <LoadingSpiner />
    }
    return (
        <div>
            <div className="hidden md:flex ">
                {
                    user ? <>
                        <div className="dropdown dropdown-end ">

                            <div
                                tabIndex={0}
                                role="button"
                                className="flex justify-center items-center"
                            >

                                <div className="w-9 rounded-full">

                                    <img
                                        alt={user?.displayName}
                                        title={user?.displayName}
                                        src={user?.photoURL}
                                        className="h-9 w-full rounded-full"
                                    />

                                </div>
                                <div className="">
                                    <h3 className=" text-white pl-1"><IoIosArrowDown /></h3>
                                </div>

                            </div>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 space-y-2 z-10 mt-3 w-52 py-4 shadow"
                            >

                                {role === 'admin' && (
                                    <>
                                        <li className="text-md">
                                            <NavLink to="/profile" className='flex items-center gap-2'>
                                                <FiUser className="text-lg" />
                                                Profile
                                            </NavLink>
                                        </li>
                                        <li className="text-md">
                                            <NavLink to="/admin-dashboard" className='flex items-center gap-2'>
                                                <RxDashboard className="text-lg" />
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li className="text-md">
                                            <button onClick={handleLogOut}>
                                                <FiLogOut className="text-lg" />
                                                Log out</button>
                                        </li>
                                    </>
                                )

                                }
                                {
                                    role === 'seller' && (
                                        <>
                                            <li className="text-md">
                                                <NavLink to="/profile" className='flex items-center gap-2'>
                                                    <FiUser className="text-lg" />
                                                    Profile
                                                </NavLink>
                                            </li>

                                            <li className="text-md">
                                                <NavLink to="/seller-dashboard" className='flex items-center'>
                                                    <RxDashboard className="text-lg" />
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li className="text-md">
                                                <button onClick={handleLogOut}>
                                                    <FiLogOut className="text-lg" />
                                                    Log out</button>
                                            </li>
                                        </>
                                    )
                                }
                                {
                                    role === 'user' && (
                                        <>
                                            <li className="text-lg"><NavLink to="/profile" className='flex items-center'>
                                                <FiUser className="text-lg" />
                                                Profile
                                            </NavLink>
                                            </li>

                                            <li className="text-md"><NavLink to="/myOrders" className='flex items-center'>
                                                <HiOutlineShoppingBag className="text-lg" />
                                                My Orders
                                            </NavLink></li>
                                            <li className="text-md"><NavLink to="/becomeseller" className='flex items-center'>
                                                <MdStorefront className="text-lg" />
                                                Become a Seller
                                            </NavLink></li>
                                            <li className="text-md">
                                                <button onClick={handleLogOut} className='flex items-center'>
                                                    <FiLogOut className="text-lg" />
                                                    Log out</button>
                                            </li>
                                        </>
                                    )
                                }


                            </ul>
                        </div>


                    </> :
                        <>
                            <div className='text-white font-bold'>
                                <NavLink to='/signup'>Sign Up</NavLink>
                            </div>
                        </>
                }

            </div>
        </div>
    );
};

export default ProfileDropdown;