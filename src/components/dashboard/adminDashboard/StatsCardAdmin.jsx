import React from 'react';

const StatsCardAdmin = ({ title, value, icon, color }) => {
    return (
        <div className="rounded-lg p-6 flex items-center space-x-4 ">
            {/* Icon */}
            <div className={`p-4 rounded-full text-white text-2xl ${color}`}>
                {icon}
            </div>

            {/* Title & Value */}
            <div>
                <h3 className="text-white-500 font-bold text-lg">{title}</h3>
                <p className="text-2xl font-bold ">{value}</p>
            </div>
        </div>
    );
};

export default StatsCardAdmin;
