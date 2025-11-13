import React, { useState } from 'react';
import MyProductTable from './MyProductTable';
import { NavLink } from 'react-router';
import useSellerProducts from '../../../hooks/useSellerProducts';

const MyProducts = () => {
  
    const [status, setStatus] = useState("All");
    const [searchText, setSearchText] = useState("");

    const statuses = ["All", "Pending", "Approved", "Rejected"];

    // ✅ useProducts hook automatically refetches when `status` changes
    const {MyProducts, isLoading, isError} = useSellerProducts(status,searchText);
   
    
    return (
        <div>
            <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Manage Products
                </h3>
                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 shadow mb-6">
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
                                {sta}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <MyProductTable
                     MyProducts={MyProducts}
                     isError={isError}
                     isLoading={isLoading}
                     
                     />
                </div>
            </div>
        </div>
    );
};

export default MyProducts;