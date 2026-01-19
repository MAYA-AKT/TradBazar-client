import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

import useAuth from "../../../hooks/useAuth";
import useSellerEarningsByDate from "../../../hooks/useSellerEarningsByDate";

const EarningsCalendar = () => {
    const { user } = useAuth();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const {
        data: earnings = [],
        isLoading,
    } = useSellerEarningsByDate(user?.email, month, year);

    // ✅ Convert array → map (day => amount)
    const earningsMap = {};
    earnings.forEach(item => {
        earningsMap[item._id.day] = item.total;
    });

    // ✅ Show earning inside calendar cell
    const tileContent = ({ date, view }) => {
        if (view !== "month") return null;

        const day = date.getDate();
        const amount = earningsMap[day];

        if (amount) {
            return (
                <div className="text-xs text-green-600 font-semibold mt-1">
                    {amount}৳
                </div>
            );
        }

        return null;
    };

    // ✅ Detect month/year change
    const handleActiveStartDateChange = ({ activeStartDate }) => {
        setMonth(activeStartDate.getMonth() + 1);
        setYear(activeStartDate.getFullYear());
    };

    // ✅ Selected date earning
    const selectedDay = selectedDate.getDate();
    const selectedEarning = earningsMap[selectedDay] || 0;

    return (
        <div className="mt-15">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Earnings Calendar</h3>
            <div className="bg-white p-4 rounded shadow space-y-4">

                {isLoading ? (
                    <p>Loading calendar...</p>
                ) : (
                    <>
                        <div className="flex bg-green-100 py-5 justify-center">
                            <Calendar 
                                value={selectedDate}
                                onChange={setSelectedDate}
                                onActiveStartDateChange={handleActiveStartDateChange}
                                tileContent={tileContent}
                            />
                        </div>

                        {/* Selected date summary */}
                        <div className="mt-3 p-3 bg-green-200 rounded text-center">
                            <p className="text-sm text-gray-600">
                                Earnings on{" "}
                                <span className="font-semibold">
                                    {selectedDate.toDateString()}
                                </span>
                            </p>
                            <p className="text-xl font-bold text-green-600">
                                {selectedEarning}৳
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EarningsCalendar;
