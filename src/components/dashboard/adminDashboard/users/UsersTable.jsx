import React from 'react';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import LoadingSpiner from '../../../../pages/error pages/LoadingSpiner';
import toast from 'react-hot-toast';


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

    // make admin
    const handleMakeAdmin = async (id) => {
        try {
            const res = await axiosSecure.patch(`/users/make-admin/${id}`);

            if (res.data.success) {
                toast.success("User promoted to admin");
                refetch();
            }
        } catch (error) {
            toast.error("Failed to make admin", error);
        }
    };



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
        <div className="">
            <div className="overflow-x-auto bg-white ">
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
                                        onClick={() => handleMakeAdmin(user._id)}
                                        disabled={user.role === "admin"}
                                        className={`px-3 py-1 rounded text-md font-bold text-white
    ${user.role === "admin"
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-green-500 hover:bg-green-600"}
  `}
                                    >
                                        {user.role === "admin" ? "Admin" : "Make Admin"}
                                    </button>

                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="text-red-500 text-xl px-3 py-1 rounded hover:text-red-600"
                                        title='delete user'
                                    >
                                        <FaTrash />
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