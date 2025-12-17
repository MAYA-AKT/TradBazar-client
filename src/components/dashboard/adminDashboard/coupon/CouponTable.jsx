import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CouponTable = ({ coupons, refetch }) => {
    const axiosSecure = useAxiosSecure();


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null)

    const [formData, setFormData] = useState({
        code: "",
        discount: 0,
        type: "",
        minAmount: 0,
    });

    // Open edit modal
    const openEditModal = (coupon) => {
        setSelectedCoupon(coupon);
        setFormData({
            code: coupon.code,
            discount: coupon.discount,
            type: coupon.type,
            minAmount: coupon.minAmount || 0,
        });
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCoupon(null);
    };

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Submit edit
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCoupon) return;

        try {
            const res = await axiosSecure.put(`/coupons/${selectedCoupon._id}`, {
                ...formData,
                discount: Number(formData.discount),
                minAmount: Number(formData.minAmount),
            });

            if (res.data.success) {
                toast.success("Coupon updated successfully!");
                refetch();
                closeModal();
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Server error");
        }
    };

    // Delete coupon
    const handleDelete = async (id) => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f97316", // orange
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/coupons/${id}`);
                if (res.data.success) {
                    toast.success("Coupon deleted successfully!");
                    refetch();
                } else {
                    toast.error(res.data.message);
                }
            } catch (err) {
                toast.error(err.response?.data?.message || "Server error");
            }
        }
    };

    return (
        <>
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="p-3 border-b">Code</th>
                        <th className="p-3 border-b">Discount</th>
                        <th className="p-3 border-b">Type</th>
                        <th className="p-3 border-b">Min Amount</th>
                        <th className="p-3 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map((coupon) => (
                        <tr key={coupon._id} className="border-b border-gray-300 hover:bg-gray-50">
                            <td className="p-3">{coupon.code}</td>
                            <td className="p-3">{coupon.discount}</td>
                            <td className="p-3">{coupon.type}</td>
                            <td className="p-3">{coupon.minAmount}</td>
                            <td className="p-3">
                                <div className="flex gap-3 items-center justify-start">
                                    <button
                                        onClick={() => openEditModal(coupon)}
                                        className="text-blue-500 text-xl hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(coupon._id)}
                                        className="text-red-500 text-xl hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-9 rounded-lg w-96 shadow-lg relative">
                        <h2 className="text-xl font-semibold mb-4">Edit Coupon</h2>

                        <form onSubmit={handleEditSubmit} className="space-y-3">
                            <div>
                                <label className="block font-medium mb-1">Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Discount</label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="select select-bordered w-full"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="percent">Percent (%)</option>
                                    <option value="flat">Fixed Amount (৳)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Minimum Amount</label>
                                <input
                                    type="number"
                                    name="minAmount"
                                    value={formData.minAmount}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="flex justify-end gap-2 mt-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CouponTable;
