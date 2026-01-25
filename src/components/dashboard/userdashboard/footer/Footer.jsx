import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLeaf, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { NavLink } from 'react-router';


const Footer = () => {
    return (
        <>
            <footer className="bg-green-800  pt-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1  md:grid-cols-4 gap-10">

                    {/* About Section */}
                    <div className=" ">
                        <div className="flex items-center">
                            <a href="/" className="text-3xl mb-3 flex font-bold items-center text-green-400 cursor-pointer">
                                <span><FaLeaf className="text-green-400" />  </span>  Bongo <span className="text-orange-200">Haat</span>
                            </a>
                        </div>

                        <p className="text-white text-sm leading-relaxed text-justify">
                            BongoHaat is Bangladesh’s trusted multi-vendor marketplace, connecting buyers with authentic handmade and traditional products.
                            Enjoy <span className="font-semibold text-green-400">verified listings</span>,{" "}
                            <span className="font-semibold text-blue-400">direct communication via notifications</span>, and{" "}
                            <span className="font-semibold text-purple-400">video calls</span> to see products before ordering.
                            Supporting local artisans and bringing Bangladeshi culture to your doorstep.
                        </p>

                    </div>


                    {/* Quick Links */}
                    <div className='md:ml-20'>
                        <h3 className="text-md font-semibold text-orange-400 mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-white text-sm">
                            <li className=" text-white hover:orange-400"><NavLink to="/" className=" text-white hover:orange-400">Home</NavLink></li>
                            <li className=" text-white hover:orange-400"><NavLink to="/profile" className="hover:orange-400">Profile</NavLink></li>
                            <li className=" text-white hover:orange-400"><NavLink to="/orders" className="hover:orange-400">My Orders</NavLink></li>
                            <li className=" text-white hover:orange-400"><NavLink to="/become-seller" className="hover:orange-400">Become a Seller</NavLink></li>

                            <li className=" text-white hover:orange-400"><NavLink to="/cart" className="">Cart</NavLink></li>

                        </ul>
                    </div>

                    {/* Categories + Support */}
                    <div className=''>
                        <h3 className="text-md font-semibold text-orange-400 mb-4">Categories & Support</h3>
                        <ul className="space-y-2 text-sm ">
                            <li className=" text-white hover:orange-400"><NavLink to="/category/vegetables" className="hover:orange-400">Vegetables</NavLink></li>
                            <li className=" text-white hover:orange-400"><NavLink to="/category/fruits" className="hover:orange-400">Fruits</NavLink></li>
                            <li className=" text-white hover:orange-400"><NavLink to="/category/handicrafts" className="hover:orange-400">Handicrafts</NavLink></li>
                            <li className=" text-white hover:orange-400"><NavLink to="/category/organic-products" className="hover:orange-400">Organic Products</NavLink></li>
                            <li className=" text-white hover:orange-400"><NavLink to="/category/home-decor" className="hover:orange-400">Home Decor</NavLink></li>
                            <li className=" text-white hover:orange-400"><NavLink to="/" className="hover:orange-400">FAQ</NavLink></li>
                            <li className=" text-white hover:orange-400"><NavLink to="/" className="">Shipping Info</NavLink></li>
                            <li className=" text-white hover:orange-400"><NavLink to="/" className="hover:orange-400">Track Order</NavLink></li>
                            <li className=" text-white hover:orange-400"><NavLink to="/" className="hover:orange-400">Notifications</NavLink></li>
                            <li className=" text-white hover:orange-400"><NavLink to="/" className="hover:orange-400">Return Policy</NavLink></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-md font-semibold text-orange-400 mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-gray-300 text-sm">
                            <li className="flex items-center gap-2 hover:text-orange-400 ">
                                <FaPhone /> <span>+880 123 456 789</span>
                            </li>
                            <li className="flex items-center gap-2 hover:text-orange-400 ">
                                <FaWhatsapp /> <span>+01407533436</span>
                            </li>
                            <li className="flex items-center gap-2 hover:text-orange-400 ">
                                <FaEnvelope /> <span>support@BongoHaat.com</span>
                            </li>
                            <li className="flex items-center gap-2 hover:text-orange-400 ">
                                <FaMapMarkerAlt /> <span>Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                        <div className="flex gap-4 mt-4">
                            <FaFacebookF className="w-5 h-5 text-orange-400  hover:text-orange-400  cursor-pointer" />
                            <FaInstagram className="w-5 h-5 hover:text-orange-600 text-orange-400   cursor-pointer" />
                            <FaWhatsapp className="w-5 h-5 hover:text-orange-600 cursor-pointer text-orange-400 " />
                        </div>
                    </div>

                </div>

                {/* Bottom copyright */}
                <div className="border-t border-gray-600 mt-10 py-4 text-center text-white text-sm">
                    &copy; {new Date().getFullYear()} BongoHaat. All rights reserved.
                </div>
            </footer>
        </>
    );
};

export default Footer;