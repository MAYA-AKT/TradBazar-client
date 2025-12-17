import React from 'react';
import useAuth from '../../hooks/useAuth';

const MyOrderLeft = () => {
    const { user } = useAuth();
   

    return (
        <div className="bg-white shadow-md  p-5 flex items-center gap-4">
           
            <img
                src={user?.photoURL || "https://via.placeholder.com/100"}
                alt="User"
                className="w-15 h-15 rounded-full object-cover border"
            />

         
            <div>
                <p className="text-gray-500 text-sm">Hello!</p>
                <h2 className="text-lg font-semibold text-gray-800">
                    {user?.displayName || "Guest User"}
                </h2>
            </div>
        </div>

    );
};

export default MyOrderLeft;