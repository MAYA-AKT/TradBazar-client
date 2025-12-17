import { useState } from "react";
import { NavLink } from "react-router";
import useCoupons from "../../../../hooks/useCoupons";
import CouponTable from "./CouponTable";
import LoadingSpiner from "../../../../pages/error pages/LoadingSpiner";


const Coupons = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    // Fetch coupons using our custom hook
    const { coupons, totalPages, isLoading, isError, error, refetch } = useCoupons(page, search);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // reset page to 1 on new search
    };


    if(isLoading || isError || error){
        return <LoadingSpiner/>
    }



    return (
        <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Coupon Categories
            </h3>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 shadow mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search categories..."
                    className="w-full sm:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-500"
                />

                <NavLink
                    to='/admin-dashboard/create-coupon'
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-lg shadow transition"
                >
                    + Add Coupon
                </NavLink>
            </div>

            <div className="bg-white p-4 shadow rounded-lg">
                
                {!isLoading && !isError && (
                    <>
                        <CouponTable coupons={coupons} refetch={refetch} />

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-4 gap-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        className={`px-3 py-1 rounded border ${page === i + 1 ? "bg-orange-500 text-white" : "bg-white text-gray-700"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Coupons;
