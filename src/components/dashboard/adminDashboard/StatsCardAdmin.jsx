import React from 'react';

const StatsCardAdmin = ({ title, value, icon, color }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:shadow-xl transition">
            {/* Icon */}
            <div className={`p-4 rounded-full text-white text-2xl ${color}`}>
                {icon}
            </div>

            {/* Title & Value */}
            <div>
                <h3 className="text-gray-500 font-medium">{title}</h3>
                <p className="text-2xl font-bold ">{value}</p>
            </div>
        </div>
    );
};

export default StatsCardAdmin;
