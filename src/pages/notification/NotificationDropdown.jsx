import { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router";
import useNotifications from "../../hooks/useNotifications";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const NotificationDropdown = ({ userEmail }) => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { notifications, isLoading } = useNotifications(userEmail);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const handleClick = async (n) => {
        try {
            await axiosSecure.patch(`/notifications/read/${n._id}`);
            navigate(n.link);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="relative">
            {/* Bell Icon */}
            <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
                <IoIosNotifications size={26} />
                {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-1.5 py-0.5 ">
                        {unreadCount}
                    </span>
                )}
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white  shadow-lg overflow-hidden z-50">
                    <h4 className="font-semibold p-3  text-gray-700 text-center ">Notifications</h4>
                    <hr className="text-gray-200 mx-2" />
                    <div className="p-2">
                        {isLoading ? (
                            <p className="p-3 text-sm text-gray-500 text-center">Loading...</p>
                        ) : notifications.length === 0 ? (
                            <p className="p-3 text-sm text-gray-500 text-center">No notifications</p>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n._id}
                                    onClick={() => handleClick(n)}
                                    className={`cursor-pointer p-3 my-3 hover:bg-gray-100 transition ${!n.isRead ? "bg-orange-100 font-semibold" : "bg-base-200"
                                        }`}
                                >
                                    <IoIosNotifications className="text-blue-500 mt-1" size={20} />
                                    <div>
                                        <p>{n.title}</p>
                                        <p className="text-sm text-gray-600">{n.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(n.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
