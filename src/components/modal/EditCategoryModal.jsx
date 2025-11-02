import React, { useEffect, useState } from 'react';

const EditCategoryModal = ({ category, isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
    });
    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || "",
                image: category.image || "",
                description: category.description || "",
            });
        }
    }, [category]);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4 text-center">Edit Category</h2>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit(formData);
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                            <textarea
                                rows="3"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-300"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditCategoryModal;