import { Outlet, NavLink } from "react-router";
import { FiBox, FiPlus, FiLogOut } from "react-icons/fi";

const SellerLayout = () => {
    return (
        <div>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="w-64 bg-base-200 p-5">
                    <h2 className="text-xl font-bold text-orange-500 mb-6">Seller Panel</h2>

                    <nav className="flex flex-col gap-3">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-md ${isActive ? "bg-orange-100 text-orange-600" : "hover:bg-orange-50"
                                }`
                            }
                        >
                            <FiBox /> My Products
                        </NavLink>

                        <NavLink
                            to="/dashboard/add-product"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-md ${isActive ? "bg-orange-100 text-orange-600" : "hover:bg-orange-50"
                                }`
                            }
                        >
                            <FiPlus /> Add Product
                        </NavLink>

                        <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-50 mt-auto">
                            <FiLogOut /> Logout
                        </button>
                    </nav>
                </aside>

                {/* Content */}
                <main className="flex-1 bg-base-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SellerLayout;