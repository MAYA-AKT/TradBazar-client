import React from 'react';
import useUsers from '../../../../hooks/useUsers';
import { useState } from 'react';
import UsersTable from './UsersTable';


const AllUsers = () => {




    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    const { users, totalPages,totalUsers, isLoading, isError, refetch } = useUsers(searchText, page, 8);
    return (
        <div>
            <div className="max-w-7xl mx-auto mt-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Users : {totalUsers}
                </h3>
                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 shadow mb-6">

                    <input
                        type="text"
                        placeholder="Search products by name..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full sm:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-black-500"
                    />

                </div>
                <div>
                    <UsersTable
                        users={users}
                        isError={isError}
                        isLoading={isLoading}
                        refetch={refetch}

                    />
                </div>
                {/* pagination */}
                <div className="flex gap-2 justify-center my-15">
                    {[...Array(totalPages).keys()].map(i => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 border ${page === i + 1 ? "bg-green-500 text-white" : ""}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AllUsers;