import { useState } from "react";
import useProducts from "../../../../hooks/useAdminProducts";
import ProductsTable from "./ProductsTable";
import LoadingSpiner from "../../../../pages/error pages/LoadingSpiner";

const AllProducts = () => {
    const [status, setStatus] = useState("all");
    const [searchText, setSearchText] = useState(""); 

    const statuses = ["all", "pending", "verified", "rejected"];

    
    const { products, isLoading, isError, refetch } = useProducts(status,searchText);

    if (isLoading) return <LoadingSpiner />;
    if (isError) return <p className="text-red-500 text-center">Failed to load products.</p>;

    return (
        <div className="p-4">
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
                            {sta.charAt(0).toUpperCase() + sta.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Pass Filtered Products to Table */}
            <ProductsTable
                products={products}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
            />
        </div>
    );
};

export default AllProducts;
