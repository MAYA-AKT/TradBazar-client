import { NavLink } from "react-router";
import useTopSellingProducts from "../../../../hooks/useTopSellingProducts";


const TopSellingProducts = () => {
    const {
        topSellingProducts,
        topSellingLoading,
        topSellingError,
    } = useTopSellingProducts();

    console.log('selling products ', topSellingProducts);


    if (topSellingLoading ||
        topSellingError) {
        return <p className="text-center py-10">Loading top sellers...</p>;
    }


    return (
        <section className="max-w-7xl mx-auto">
            <h2 className="text-xl text-gray-800 mb-4 ml-2 md:ml-0">
                Top Selling Products
            </h2>

            <div className="bg-white p-2 md:p-4">

                <div className="grid grid-cols-2  md:grid-cols-5 lg:grid-cols-6 gap-3 p-3 md:p-6">
                    {topSellingProducts?.map((item, idx) => {
                        const p = item.product;

                        return (
                            <div key={idx} className=" hover:shadow-lg transition ">
                                <NavLink
                                    to={`/product/${item.product._id}`}
                                >
                                    <div

                                        className=" "
                                    >
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="w-full h-40 object-cover "
                                        />

                                        <div className="p-2">
                                            <h3 className="font-semibold text-lg truncate">
                                                {p.name}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {p.category}
                                            </p>

                                            <p className="text-green-600 font-bold mt-1">
                                                ৳ {p.price}
                                            </p>

                                            <div className="flex bg-gray-50 px-2 justify-between items-center mt-3">
                                                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                                    🔥 Best Seller
                                                </span>

                                                <span className="text-xs text-gray-600">
                                                    {item.totalSold} sold
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                               

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TopSellingProducts;
