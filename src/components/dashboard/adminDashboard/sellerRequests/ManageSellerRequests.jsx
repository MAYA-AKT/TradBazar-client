import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpiner from '../../../../pages/error pages/LoadingSpiner';

const ManageSellerRequests = () => {

    const axiosSecure = useAxiosSecure();
    const { data: requests = [], refetch ,isLoading,isError} = useQuery({
        queryKey: ["sellerRequests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/seller-requests");
            return res.data;
        },
    });

    const handleSellerAction = async (email, action) => {
        try {
            const res = await axiosSecure.patch(`/admin/seller/update-request/${email}`, {
                action,
            });
            Swal.fire("Success", res.data.message, "success");
            refetch();
        } catch (err) {
            console.error(err);
            Swal.fire(
                "Error",
                err.response?.data?.message || "Something went wrong",
                "error"
            );
        }
    };

    if(isError || isLoading){
        return <LoadingSpiner/>
    }
    return (
        <div>
            <div className="max-w-7xl mx-auto mt-10">
                <h2 className="text-2xl font-bold mb-6">Manage Seller Requests : {requests.length} </h2>
                <table className="table w-full bg-white shadow rounded-lg">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Source</th>
                            <th>ProductType</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id}>
                                <td>{req.name}</td>
                                <td>{req.email}</td>
                                <td>{req.sellerRequest?.district}</td>
                                <td>{req.sellerRequest?.source}</td>
                                <td>{req.sellerRequest?.productType}</td>
                                <td>{req.sellerRequest?.status}</td>
                                <td>{req.sellerRequest?.date}</td>
                                <td>
                                    <button
                                        onClick={() => handleSellerAction(req.email, "approved")}
                                        className="btn btn-success btn-sm"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleSellerAction(req.email, "rejected")}
                                        className="btn btn-error btn-sm ml-2"
                                    >
                                        Reject
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

export default ManageSellerRequests;