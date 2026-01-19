import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';

const SellerSalesInsights = ({ revenueByDate = [], topProducts = [] }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* --- Revenue Line Chart --- */}
            <div className="bg-green-50 rounded-xl shadow p-5">
                <h3 className="text-lg font-semibold mb-4 text-green-500">Revenue Over Time</h3>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueByDate.length ? revenueByDate : []}>
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#10B981"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* --- Top Products Bar Chart --- */}
            <div className="bg-blue-50 rounded-xl shadow p-5">
                <h3 className="text-lg font-semibold mb-4 text-blue-500">Top Selling Products</h3>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topProducts}>
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="totalSold" fill="#6366F1" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default SellerSalesInsights;
