import React from 'react';
import useUsers from '../../../../hooks/useUsers';
import { useState } from 'react';
import UsersTable from './UsersTable';

const AllUsers = () => {

    const [searchText, setSearchText] = useState("");

    const { users, isLoading, isError, refetch } = useUsers(searchText);
    return (
        <div>
            <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Manage Products
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
            </div>
        </div>
    );
};

export default AllUsers;