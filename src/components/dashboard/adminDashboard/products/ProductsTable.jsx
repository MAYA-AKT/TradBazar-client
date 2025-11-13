import React from 'react';

import LoadingSpiner from '../../../../pages/error pages/LoadingSpiner';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from "sweetalert2";


const ProductsTable = ({ products, isLoading, isError, refetch }) => {


    const axiosSecure = useAxiosSecure();

    // Status Change approved or reject by admin
    const handleStatusChange = async (id, newStatus) => {
        try {
            const result = await Swal.fire({
                title: `Are you sure?`,
                text: `You are about to mark this product as ${newStatus}.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: newStatus === "Approved" ? "#16a34a" : "#dc2626",
                cancelButtonColor: "#6b7280",
                confirmButtonText: `Yes, ${newStatus}`,
            });

            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/products/status/${id}`, { status: newStatus });

                if (res.data.success) {
                    Swal.fire("✅ Success!", res.data.message, "success");
                    refetch(); // refresh table
                } else {
                    Swal.fire("⚠️ Info", res.data.message, "info");
                }
            }
        } catch (error) {

            Swal.fire("❌ Error", "Failed to update product status", error);
        }
    };
    const handleFeatureToggle = async (id, featured) => {
        try {
            const res = await axiosSecure.patch(`/admin/products/featured/${id}`, { featured });
            Swal.fire("Success", res.data.message, "success");
            refetch(); // Refresh table after action
        } catch (error) {
            console.error(error);
            Swal.fire(
                "Error",
                error.response?.data?.message || "Failed to update featured status",
                "error"
            );
        }
    };

    if (isLoading || isError)
        return <LoadingSpiner />
    if (products.length === 0) {
        return (
            <h3 className="text-center text-gray-500 text-lg mt-20">
                No products found for the selected filter. Please try a different status or add new products.
            </h3>
        );
    }


    return (
        <>
            <div className="p-4">


                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-left">
                                <th className="py-3 px-4 border-b">#</th>
                                <th className="py-3 px-4 border-b">Image</th>
                                <th className="py-3 px-4 border-b">Name</th>
                                <th className="py-3 px-4 border-b">Category</th>
                                <th className="py-3 px-4 border-b">Description</th>
                                <th className="py-3 px-4 border-b">Quantity</th>
                                <th className="py-3 px-4 border-b">Price</th>
                                <th className="py-3 px-4 border-b">Unit</th>
                                <th className="py-3 px-4 border-b">SellerEmail</th>
                                <th className="py-3 px-4 border-b">status</th>
                                <th className="py-3 px-4 border-b text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr
                                    key={product._id}
                                    className="hover:bg-gray-100 transition duration-200"
                                >
                                    <td className="py-1 px-4 border-gray-200 border-b ">{index + 1}</td>
                                    <td className="py-1 px-4 border-gray-200 border-b">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    </td>
                                    <td>
                                        {product.name}
                                        {product.featured && <span className="text-yellow-500 ml-1">⭐</span>}
                                    </td>
                                    <td className="py-3 px-4 border-gray-200 border-b font-medium">{product.category}</td>
                                    <td className="py-3 px-4 border-gray-200 border-b text-gray-600">
                                        {product.description.length > 60
                                            ? product.description.slice(0, 20) + "..."
                                            : product.description}
                                    </td>
                                    <td className="py-3 px-4 border-gray-200 border-b font-medium">{product.quantity}</td>
                                    <td className="py-3 px-4 border-gray-200 border-b font-medium">{product.price}</td>
                                    <td className="py-3 px-4 border-gray-200 border-b font-medium">{product.unit}</td>
                                    <td className="py-3 px-4 border-gray-200 border-b font-medium">{product.seller.email}</td>
                                    <td className="py-3 px-4 border-gray-200 border-b font-medium text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold
                                                    ${product.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                                                    : product.status === "Approved"
                                                        ? "bg-green-100 text-green-700 border border-green-300"
                                                        : product.status === "Rejected"
                                                            ? "bg-red-100 text-red-700 border border-red-300"
                                                            : "bg-gray-100 text-gray-600 border border-gray-300"
                                                }`}
                                        >
                                            {product.status || "Pending"}
                                        </span>
                                    </td>

                                    <td className="py-3 px-4 border-gray-200 border-b text-center space-x-2">
                                        <div className="flex gap-2">
                                            <button
                                                className="btn btn-sm btn-success"
                                                disabled={product.status === "Approved"}
                                                onClick={() => handleStatusChange(product._id, "Approved")}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="btn btn-sm btn-error"
                                                disabled={product.status === "Rejected"}
                                                onClick={() => handleStatusChange(product._id, "Rejected")}
                                            >
                                                Reject
                                            </button>
                                            {/* Only show Feature button for approved products */}
                                            {product.status === "Approved" && (
                                                <button
                                                    onClick={() => handleFeatureToggle(product._id, !product.featured)}
                                                    className={`btn btn-sm ml-2 ${product.featured ? "btn-warning" : "btn-outline"}`}
                                                >
                                                    {product.featured ? "Unfeature" : "Feature"}
                                                </button>
                                            )}
                                        </div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
};

export default ProductsTable;