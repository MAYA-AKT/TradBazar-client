import { useState } from "react";
import { BiSolidCart } from "react-icons/bi";
import { FiMenu, FiSearch } from "react-icons/fi";
import { Link, NavLink } from "react-router";
import Searchbar from "../Searchbar";
import { IoIosArrowBack } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import LoadingSpiner from "../../pages/error pages/LoadingSpiner";
import useCategories from "../../hooks/useCategories";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import useCartCount from "../../hooks/useCartCount";
import NotificationDropdown from "../../pages/notification/NotificationDropdown";
import { AiOutlineHome } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { FiUser, FiLogOut } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdStorefront } from "react-icons/md";


const Header = () => {

    const { user, logOut } = useAuth();
    const { role, isLoading, isError } = useUserRole();
    const { categories, isLoading: categoryLoading, isError: categoryError } = useCategories();
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


    // cart count

    const { data: cartCount = 0 } = useCartCount(user?.email);

    if (isLoading || isError || categoryLoading || categoryError) {
        return <LoadingSpiner />
    }
    return (
        <div className="bg-base-200 py-1 sticky top-0 z-50">

            <div className="flex justify-between items-center h-14 px-4 md:px-6 max-w-7xl mx-auto">

                {!isSearchOpen && (
                    <div className="flex items-center ">
                        {/* Hamburger Menu (mobile) */}
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="md:hidden text-xl p-2  text-gray-800"
                        >
                            <FiMenu className=" " />
                        </button>
                        {/* Logo */}
                        <a href="/" className="text-xl text-orange-500 font-bold cursor-pointer">
                            Tradbazar
                        </a>
                    </div>
                )}

                {/* MIDDLE: Searchbar (desktop only) */}
                <div className="hidden md:flex items-center w-full pl-3 max-w-md lg:max-w-lg">
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
                        <div className="w-9 flex md:hidden  rounded-full">

                            <img
                                alt={user?.displayName}
                                title={user?.displayName}
                                src={user?.photoURL}
                                className="h-9 w-full rounded-full"
                            />

                        </div>



                        {/* Profile dropdown lg decice */}
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
                                                <h3 className=" text-gray-600 pl-1"><IoIosArrowDown /></h3>
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
                                        <div>
                                            <NavLink to='/signup'>Sign Up</NavLink>
                                        </div>
                                    </>
                            }

                        </div>

                        {/* Cart */}
                        <div className="hidden md:flex space-x-4">
                            <Link to='/cart'
                                className="relative cursor-pointer">
                                <BiSolidCart size={26} />
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                    {cartCount}
                                </span>
                            </Link>



                            <NotificationDropdown userEmail={user?.email} />

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
                        className="absolute top-0 left-0 bg-base-100 w-70 h-full p-5 shadow-lg overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div onClick={() => setIsDrawerOpen(false)}
                            className="flex justify-end text-xl text-gray-500">

                            <AiOutlineClose />
                        </div>
                        {/* icons for mobile only */}
                        <div>
                            <a href="/" className="text-2xl text-orange-500 font-bold cursor-pointer">
                                Tradbazar
                            </a>
                            {/* Profile dropdown */}
                            <div className=" md:flex">
                                {
                                    user ? <>
                                        <ul
                                            className="space-y-4 mt-4 "

                                        >
                                            <li className="text-md">
                                                <NavLink to="/" className='flex items-center gap-2'>
                                                    <AiOutlineHome className="text-xl" />
                                                    Home
                                                </NavLink>
                                            </li>
                                            {role === 'admin' && (
                                                <>
                                                    <li className="text-md">
                                                        <NavLink to="/profile" className='flex items-center gap-2'>
                                                            <FiUser className="text-xl" />
                                                            Profile
                                                        </NavLink>
                                                    </li>
                                                    <li className="text-md">
                                                        <NavLink to="/admin-dashboard" className='flex items-center gap-2'>
                                                            <RxDashboard className="text-xl" />
                                                            Dashboard
                                                        </NavLink>
                                                    </li>
                                                    <li className="text-md">
                                                        <button onClick={handleLogOut} className='flex items-center gap-2'>
                                                            <FiLogOut className="text-xl" />
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
                                                                <FiUser className="text-xl" />
                                                                Profile
                                                            </NavLink>
                                                        </li>

                                                        <li className="text-md"><NavLink to="/seller-dashboard" className='flex items-center gap-2'>
                                                            <RxDashboard className="text-xl" />
                                                            Dashboard
                                                        </NavLink>
                                                        </li>
                                                        <li className="text-md">
                                                            <button onClick={handleLogOut} className='flex items-center gap-2'>
                                                                <FiLogOut className="text-xl" />
                                                                Log out</button>
                                                        </li>
                                                    </>
                                                )
                                            }
                                            {
                                                role === 'user' && (
                                                    <>
                                                        <li className="text-md"><NavLink to="/profile" className='flex items-center gap-2'>
                                                            <FiUser className="text-xl" />
                                                            Profile
                                                        </NavLink>
                                                        </li>
                                                        <li className="text-md"><NavLink to="/myOrders" className='flex items-center gap-2'>
                                                            <HiOutlineShoppingBag className="text-xl" />
                                                            My Orders
                                                        </NavLink></li>
                                                        <li className="text-md"><NavLink to="/becomeseller" className='flex items-center gap-2'>
                                                            <MdStorefront className="text-xl" />
                                                            Become a Seller
                                                        </NavLink></li>
                                                        <li>
                                                            <Link to='/cart'
                                                                className="relative cursor-pointer">
                                                                <BiSolidCart size={26} />
                                                                <span className="absolute -top-1 left-4 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                                                    {cartCount}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <NotificationDropdown userEmail={user?.email} />
                                                        </li>
                                                        <li className="text-md">
                                                            <button onClick={handleLogOut} className='flex items-center gap-2'>
                                                                <FiLogOut className="text-xl" />
                                                                Log out</button>
                                                        </li>
                                                    </>
                                                )
                                            }


                                        </ul>


                                    </> :
                                        <>
                                            <div>
                                                <NavLink to='/signup'>Sign Up</NavLink>
                                            </div>
                                        </>
                                }

                            </div>
                            {/* Cart mobile device */}
                            <div className="flex flex-col mt-2 space-y-2">


                                {/* notification */}


                            </div>
                        </div>
                        <div className="mt-4">
                            <h2 className=" text-orange-500">Categories</h2>
                            <ul className="space-y-2 ml-3 mt-2 text-md">
                                {categories.map((cat) => (
                                    <li key={cat._id} className="text-m">
                                        <NavLink
                                            to={`/category/${encodeURIComponent(cat.name)}`}
                                            className={({ isActive }) =>
                                                `block rounded hover:text-orange-600 transition ${isActive ? "text-orange-600 " : " text-gray-600 "
                                                }`
                                            }
                                        >
                                            {cat.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
