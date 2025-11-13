import React from 'react';
import Swal from 'sweetalert2';

import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import LoadingSpiner from '../../../../pages/error pages/LoadingSpiner';

const UsersTable = ({ users, isLoading, isError, refetch }) => {
    const axiosSecure = useAxiosSecure();
    

    const deleteMutation = useMutation({
        mutationFn: async (id) => axiosSecure.delete(`/admin/users/${id}`),
        onSuccess: () => {
            Swal.fire("Deleted!", "The users has been deleted.", "success");
            refetch();
        },
        onError: (error) => {
            Swal.fire("Error", error?.response?.data?.message || "Failed to delete", "error");
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This User will be permanently deleted!",
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
    if (users?.length === 0) {
        return (
            <h3 className="text-center text-gray-500 text-lg mt-20">
                No Users found.
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
                        <th className="py-3 px-4 border-b">Email</th>
                            <th className="py-3 px-4 border-b">Role</th>
                            
                            <th className="py-3 px-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-100 transition">
                                <td className="py-1 px-4 border-gray-200 border-b">{index + 1}</td>
                                <td className="py-1 px-4 border-gray-200 border-b">
                                    <img
                                        src={user.photo}
                                        alt={user.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                </td>
                                <td className="py-3 px-4 border-gray-200 border-b font-medium">{user.name}</td>
                                <td className="py-3 px-4 border-gray-200 border-b">{user.email}</td>
                               
                                
                                
                                <td className="py-3 px-4 border-gray-200 border-b">{user.role}</td>
                                
                                <td className="py-3 px-4 border-gray-200 border-b text-center space-x-2">

                                    <button
                                        onClick={() => handleDelete(user._id)}
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


        </div>
    );
};

export default UsersTable;