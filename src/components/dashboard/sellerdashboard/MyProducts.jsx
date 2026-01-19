import React, { useState } from 'react';
import MyProductTable from './MyProductTable';
import { NavLink } from 'react-router';
import useSellerProducts from '../../../hooks/useSellerProducts';
import { useTitle } from '../../../hooks/useTitle';



const MyProducts = () => {
  // dynamic title
    useTitle('My Products');

    const [status, setStatus] = useState("all");
    const [searchText, setSearchText] = useState("");

    const statuses = ["all", "pending", "verified", "rejected"];


    const [page, setPage] = useState(1);

    const { MyProducts, totalPages,isError,isLoading } = useSellerProducts(
        status,
        searchText,
        page,
        8
    );



    return (
        <div>
            <div className="max-w-8xl mx-auto mt-10 px-20">
                <h3 className="text-xl font-semibold  text-gray-800 py-5">
                    Manage Products
                </h3>
                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-green-50 p-4 shadow mb-6">
                    <input
                        type="text"
                        placeholder="Search products by name..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full sm:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-black-500"
                    />
                    <div className="flex gap-3 mb-4">
                        {statuses.map((sta) => (
                            <button
                                key={sta}
                                className={`px-4 py-2 rounded font-medium transition ${status === sta
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                onClick={() => setStatus(sta)}
                            >
                                {sta.charAt(0).toUpperCase() + sta.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <MyProductTable
                        MyProducts={MyProducts}
                        isError={isError}
                        isLoading={isLoading}
                        totalPages={totalPages}
                        page={page}
                        setPage={setPage}

                    />
                </div>
            </div>
        </div>
    );
};

export default MyProducts;