import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
    return (

        <>

            <div className="flex items-center w-full border border-gray-300 rounded-md overflow-hidden ">
                <input
                    type="text"
                    placeholder="Search for products..."
                    className="flex-1 px-4 py-2 outline-none text-sm text-gray-700 placeholder-gray-400"
                />
                <button className="bg-gray-100 hover:bg-gray-200 px-3 py-3 border-l border-gray-300">
                    <FiSearch className="text-gray-600 text-lg" />
                </button>
            </div>
        </>


    );
};

export default Searchbar;