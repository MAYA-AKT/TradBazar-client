import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";


const Searchbar = () => {
    const axiosSecure = useAxiosSecure();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const delay = setTimeout(async () => {
            try {
                setLoading(true);
                const res = await axiosSecure.get(`/api/search?q=${query}`);
                setResults(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [query]);

    return (
        <div className=" relative w-full max-w-md">
            {/* Search Input */}
            <div className="flex items-center  rounded-md overflow-hidden  bg-white">
                <div className=" text-lg pl-3">
                    <FiSearch className="" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products or categories..."
                    className="flex-1 px-4 py-2 outline-none text-sm"
                />

            </div>

            {/* Dropdown */}
            {query && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-md mt-2 z-50 max-h-80 overflow-y-auto">
                    {loading && (
                        <p className="p-3 text-sm text-gray-500">
                            Searching...
                        </p>
                    )}

                    {!loading && results.length === 0 && (
                        <p className="p-3 text-sm text-gray-500">
                            No products found
                        </p>
                    )}

                    {results.map((item) => (
                        <Link
                            key={item._id}
                            to={`/product/${item._id}`}
                            onClick={() => setQuery("")}
                            className="flex items-center gap-3 p-3 hover:bg-gray-100 transition"
                        >
                            <img
                                src={item.image}
                                className="w-10 h-10 rounded object-cover"
                            />
                            <div>
                                <p className="text-sm font-medium">
                                    {item.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {item.category} · ৳{item.price}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Searchbar;
