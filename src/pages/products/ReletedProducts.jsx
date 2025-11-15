import React from 'react';
import useUserCategoryProducts from "../../hooks/useUserCategoryProducts";
import LoadingSpiner from '../error pages/LoadingSpiner';
import CardView from '../../components/view/CardView';
import { useNavigate } from 'react-router';

const ReletedProducts = ({ category }) => {
    const { products, isLoading, isError } = useUserCategoryProducts(category);
    const sliceProducts = products.slice(0, 4);
    const navigate = useNavigate();

    if (isLoading || isError) return <LoadingSpiner />;

    return (
        <div className="bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-xl mb-4 ml-2">Related Products</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {sliceProducts.map(p => (
                        <div
                            key={p._id}
                            className="cursor-pointer rounded-lg hover:shadow-lg transition p-3 bg-white"
                            onClick={() => navigate(`/product/${p._id}`)} // ✅ Navigate to new product
                        >
                            <img src={p.image} alt={p.name} className="w-full h-40 object-cover mb-3" />
                            <h3 className="text-md font-semibold text-gray-800">{p.name.toUpperCase()}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReletedProducts;