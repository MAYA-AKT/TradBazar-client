import React, { useState } from 'react';
import useCategories from '../../../../hooks/useCategories';
import LoadingSpiner from '../../../../pages/error pages/LoadingSpiner';
import Swal from "sweetalert2";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import EditCategoryModal from '../../../modal/EditCategoryModal';


const CategoryTable = () => {
    const { categories, isLoading, isError, refetch } = useCategories();
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
        <div className="p-4">


            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
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
                                <td className="py-3 px-4 border-gray-200 border-b text-center space-x-2">
                                    <button onClick={() => handleEdit(cat)}
                                        className="bg-orange-400 text-white px-3 py-1 font-bold rounded hover:bg-orange-500 transition">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat._id)}
                                        className="bg-red-500 text-white px-3 py-1 font-bold rounded hover:bg-red-600 transition">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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