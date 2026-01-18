import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    PieChart, Pie, Cell,
    BarChart, Bar
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminBottomRow = ({ revenueData = [], ordersData = [], productsData = [] }) => {
    return (
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- Revenue Over Time (Line Chart) --- */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4 text-green-500">Revenue Over Time</h2>
                {revenueData.length === 0 ? (
                    <p className="text-gray-500">No revenue data.</p>
                ) : (
                    <LineChart width={350} height={250} data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#0088FE" strokeWidth={2} />
                    </LineChart>
                )}
            </div>

            {/* --- Orders by Status (Pie Chart) --- */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4 text-blue-500">Orders by Status</h2>
                {ordersData.length === 0 ? (
                    <p className="text-gray-500">No orders data.</p>
                ) : (
                    <PieChart width={350} height={250}>
                        <Pie
                            data={ordersData}
                            dataKey="value"
                            nameKey="status"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {ordersData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                )}
            </div>

            {/* --- Products by Category (Bar Chart) --- */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4 text-orange-500">Products by Category</h2>
                {productsData.length === 0 ? (
                    <p className="text-gray-500">No product data.</p>
                ) : (
                    <BarChart width={350} height={250} data={productsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#00C49F" />
                    </BarChart>
                )}
            </div>
        </div>
    );
};

export default AdminBottomRow;
