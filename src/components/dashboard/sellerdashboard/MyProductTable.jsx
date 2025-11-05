import React, { useState } from 'react';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingSpiner from '../../../pages/error pages/LoadingSpiner';
import EditMyProductsModal from '../../modal/EditMyProductsModal';


const MyProductTable = ({ MyProducts, isLoading, isError }) => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();


    const [selectedProduct, setSelectedProduct] = useState(null);

    const queryClient = useQueryClient();



    const deleteMutation = useMutation({
        mutationFn: async (id) => axiosSecure.delete(`/myProducts/${id}`),
        onSuccess: () => {
            Swal.fire("Deleted!", "The product has been deleted.", "success");
            queryClient.invalidateQueries(["MyProducts", user?.email]); // ✅ matches queryKey
        },
        onError: (error) => {
            Swal.fire("Error", error?.response?.data?.message || "Failed to delete", "error");
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This product will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };


    if (isLoading || isError) return <LoadingSpiner />;
     if (MyProducts.length === 0) {
        return (
            <h3 className="text-center text-gray-500 text-lg mt-20">
                No products found for the selected filter. Please try a different status or add new products.
            </h3>
        );
    }

    return (
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
                            <th className="py-3 px-4 border-b">Status</th>
                            <th className="py-3 px-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MyProducts.map((product, index) => (
                            <tr key={product._id} className="hover:bg-gray-100 transition">
                                <td className="py-1 px-4 border-gray-200 border-b">{index + 1}</td>
                                <td className="py-1 px-4 border-gray-200 border-b">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                </td>
                                <td className="py-3 px-4 border-gray-200 border-b font-medium">{product.name}</td>
                                <td className="py-3 px-4 border-gray-200 border-b">{product.category}</td>
                                <td className="py-3 px-4 border-gray-200 border-b text-gray-600">
                                    {product.description.length > 30
                                        ? product.description.slice(0, 30) + "..."
                                        : product.description}
                                </td>
                                <td className="py-3 px-4 border-gray-200 border-b">{product.quantity}</td>
                                <td className="py-3 px-4 border-gray-200 border-b">{product.price}</td>
                                <td className="py-3 px-4 border-gray-200 border-b">{product.unit}</td>
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
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ Edit Modal */}
            {selectedProduct && (
                <EditMyProductsModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}

                />
            )}
        </div>
    );
};

export default MyProductTable;
