import { useState } from "react";
import { BiSolidCart } from "react-icons/bi";
import { FiMenu, FiSearch } from "react-icons/fi";
import { NavLink } from "react-router";
import Searchbar from "../Searchbar";
import { IoIosArrowBack } from "react-icons/io";
import useAuth from "../../hooks/useAuth";


const Header = () => {

    const { user,logOut } = useAuth();


    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);



    const handleLogOut = () => {
        logOut()
            .then(() => {
                alert("User log OUt");

            }).catch(err => {
                console.log(err);

            })
    }


    return (
        <div className="bg-base-200 sticky top-0 z-50">
            {/* ===== MAIN NAVBAR ===== */}
            <div className="flex justify-between items-center h-14 px-3 md:px-6 max-w-7xl mx-auto">
                {/* LEFT: Logo + Menu */}
                {!isSearchOpen && (
                    <div className="flex items-center gap-3">
                        {/* Hamburger Menu (mobile) */}
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="md:hidden text-2xl text-gray-700"
                        >
                            <FiMenu />
                        </button>

                        {/* Logo */}
                        <a className="text-2xl text-orange-500 font-bold cursor-pointer">
                            tradBazar
                        </a>
                    </div>
                )}

                {/* MIDDLE: Searchbar (desktop only) */}
                <div className="hidden md:flex items-center w-full  pl-3 max-w-md">
                    <Searchbar />
                </div>

                {/* RIGHT: Icons */}
                {!isSearchOpen && (
                    <div className="flex items-center gap-4">
                        {/* Search icon (mobile only) */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="md:hidden text-2xl text-gray-600"
                        >
                            <FiSearch />
                        </button>

                        {/* Profile dropdown */}
                        {
                            user ? <>
                                <div className="dropdown dropdown-end">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn btn-ghost btn-circle avatar"
                                    >
                                        <div className="w-9 rounded-full">
                                            <img
                                                alt="User Avatar"
                                                title={user?.displayName}
                                                src={user?.photoURL}
                                            />

                                        </div>

                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 z-10 mt-3 w-52 p-2 shadow"
                                    >
                                        <li><NavLink to="/profile">Profile</NavLink></li>
                                        <li><NavLink to="/orders">My Orders</NavLink></li>
                                        
                                        <li>
                                            <button onClick={handleLogOut}>Log out</button>
                                        </li>
                                    </ul>
                                </div>


                            </> :
                                <>
                                    <div>
                                        <NavLink to='/signup'>Sign Up</NavLink>
                                    </div>
                                </>
                        }


                        {/* Cart */}
                        <div className="relative cursor-pointer">
                            <BiSolidCart size={26} />
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                0
                            </span>
                        </div>


                    </div>
                )}
            </div>

            {/* ===== MOBILE SEARCH BAR (when active) ===== */}
            {isSearchOpen && (
                <div className="flex px-2 justify-between md:hidden -mt-12 bg-base-100 ">
                    {/* Close button */}
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className="text-2xl pr-2 text-gray-600"
                    >
                        <IoIosArrowBack />
                    </button>
                    {/* Full width Searchbar */}
                    <div className="flex-1 py-2">
                        <Searchbar />
                    </div>
                </div>
            )}

            {/* ===== MOBILE SIDEBAR ===== */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-transparant bg-opacity-40 z-40"
                    onClick={() => setIsDrawerOpen(false)}
                >
                    <div
                        className="absolute top-0 left-0 bg-base-100 w-64 h-full p-5 shadow-lg overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold text-orange-500 mb-3">Categories</h2>
                        <ul className="menu">
                            <li><NavLink to="/products?category=fruits">Fruits</NavLink></li>
                            <li><NavLink to="/products?category=vegetables">Vegetables</NavLink></li>
                            <li><NavLink to="/products?category=handicrafts">Handicrafts</NavLink></li>
                            <li><NavLink to="/products?category=clothing">Clothing</NavLink></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
