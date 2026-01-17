import React from 'react';

const Footer = () => {
    return (
        <>
            <footer className="bg-green-800 text-gray-300 ">
                <div className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                    {/* About */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">
                            TradBazar
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Tradbazar is a multi-vendor e-commerce platform promoting
                            authentic Bangladeshi farm, handmade, and homemade products.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-white cursor-pointer">Home</li>
                            <li className="hover:text-white cursor-pointer">Shop</li>
                            <li className="hover:text-white cursor-pointer">Categories</li>
                            <li className="hover:text-white cursor-pointer">About Us</li>
                        </ul>
                    </div>

                    {/* For Sellers */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">
                            For Sellers
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-white cursor-pointer">Seller Login</li>
                            <li className="hover:text-white cursor-pointer">Seller Dashboard</li>
                            <li className="hover:text-white cursor-pointer">Add Products</li>
                            <li className="hover:text-white cursor-pointer">Seller Guidelines</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">
                            Contact
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>Email: support@banglamart.com</li>
                            <li>Phone: +880 1XXXXXXXXX</li>
                            <li>Location: Bangladesh</li>
                        </ul>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="border-t border-green-800 text-center py-4 text-sm">
                    © {new Date().getFullYear()} Tradbazar. All rights reserved.
                    <span className="block text-xs text-gray-400 mt-1">
                        Final Year Project – Multi Vendor E-commerce System
                    </span>
                </div>
            </footer>

        </>
    );
};

export default Footer;