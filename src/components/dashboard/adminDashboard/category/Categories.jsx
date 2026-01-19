import { NavLink } from "react-router";
import CategoryTable from "./CategoryTable";
import { CiSearch } from "react-icons/ci";
import { useTitle } from "../../../../hooks/useTitle";

const Categories = () => {
  // dynamic title
    useTitle('Categories');

  return (
    <div className="max-w-7xl mx-auto mt-10 ">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 ">
        Categories
      </h3>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4  p-4 bg-green-50 mb-6">

        <input
          type="text"
          placeholder="Search categories..."

          className="w-full sm:w-1/3 px-4 py-2 border border-gray-200 focus:outline-none focus:ring focus:ring-orange-500"
        />


        <NavLink to='/admin-dashboard/add-category' className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-lg shadow transition" > + Add Category</NavLink>
      </div>
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default Categories;
