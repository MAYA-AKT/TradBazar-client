import React, { useState } from 'react';
import useCategories from '../../../../hooks/useCategories';
import LoadingSpiner from '../../../../pages/error pages/LoadingSpiner';
import Swal from "sweetalert2";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import EditCategoryModal from '../../../modal/EditCategoryModal';
import { FaEdit, FaTrash } from "react-icons/fa";
const CategoryTable = () => {
    const [page, setPage] = useState(1);
    const { categories, isLoading, isError, refetch, totalPages } = useCategories(page, 8);
    const axiosSecure = useAxiosSecure();




    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // update category mutation
    const updateMutation = useMutation({
        mutationFn: async ({ id, updatedData }) => {
            const res = await axiosSecure.put(`/category/${id}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("✅ Updated!", "Category updated successfully.", "success");
            refetch();
            setIsModalOpen(false);
        },
        onError: () => {
            Swal.fire("❌ Error", "Failed to update category.", "error");
        },
    })
    const handleEdit = (category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleUpdate = (updatedData) => {
        updateMutation.mutate({
            id: selectedCategory._id,
            updatedData,
        });
    };


    // delete category
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This category will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });
        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/category/${id}`);
                if (res.data.deletedCount) {
                    Swal.fire("Deleted!", "The category has been deleted.", "success");

                }
                refetch(); // refresh the table after deletion
            } catch (error) {
                Swal.fire("Error", "Something went wrong while deleting.", error);
            }
        }

    }


    if (isLoading || isError)
        return <LoadingSpiner />

    return (
        <div className="">


            <div className="overflow-x-auto  rounded-lg shadow-md">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 text-left">
                            <th className="py-3 px-4 border-b">#</th>
                            <th className="py-3 px-4 border-b">Image</th>
                            <th className="py-3 px-4 border-b">Name</th>
                            <th className="py-3 px-4 border-b">Description</th>
                            <th className="py-3 px-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat, index) => (
                            <tr
                                key={cat._id}
                                className="hover:bg-gray-100 transition duration-200"
                            >
                                <td className="py-1 px-4 border-gray-200 border-b ">{index + 1}</td>
                                <td className="py-1 px-4 border-gray-200 border-b">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                </td>
                                <td className="py-3 px-4 border-gray-200 border-b font-medium">{cat.name}</td>
                                <td className="py-3 px-4 border-gray-200 border-b text-gray-600">
                                    {cat.description.length > 60
                                        ? cat.description.slice(0, 60) + "..."
                                        : cat.description}
                                </td>
                                <td className="py-3 px-4 border-gray-200 border-b text-center ">
                                    <button onClick={() => handleEdit(cat)}
                                        className="text-blue-400 px-3 text-xl py-1 font-bold rounded hover:text-blue-500 transition">
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat._id)}
                                        className="text-red-500 text-xl  px-3 py-1 font-bold rounded text:bg-red-600 transition">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* pagination */}
            <div className="flex gap-2 mt-4 justify-center mb-20">
                {[...Array(totalPages).keys()].map(i => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 rounded ${page === i + 1 ? "bg-green-600 text-white" : "bg-gray-200"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* ✅ Edit Modal */}
            <EditCategoryModal
                category={selectedCategory}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleUpdate}
            />
        </div>
    );
};

export default CategoryTable;