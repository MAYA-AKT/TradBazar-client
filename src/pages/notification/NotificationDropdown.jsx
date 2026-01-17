import { useEffect, useRef, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useNotifications from "../../hooks/useNotifications";

const NotificationDropdown = ({ userEmail }) => {

    const [open, setOpen] = useState(false);
    // const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { notifications = [], setNotifications, isLoading, refetch } = useNotifications(userEmail);

    const dropdownRef = useRef(null);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    // 🔔 Mark as read & navigate
    const handleClick = async (n) => {
        // prevent double count
        if (n.isRead) {
            setOpen(false);
            // return navigate(n.link);
        }

        // ⚡ optimistic UI update
        setNotifications((prev) =>
            prev.map((item) =>
                item._id === n._id ? { ...item, isRead: true } : item
            )
        );

        try {
            await axiosSecure.patch(`/notifications/read/${n._id}`);
            setOpen(false);
            // navigate(n.link);
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);
    useEffect(() => {
        if (open) {
            refetch(); 
        }
    }, [open, refetch]);


    // ❌ Close on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>

            <div
                className="relative cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <IoIosNotifications size={26} />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 left-4 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </div>

            {/* 🔽 Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg z-50 rounded-lg">
                    <h4 className="font-semibold p-3 text-gray-700 text-center">
                        Notifications
                    </h4>
                    <hr className="text-gray-200 mx-2" />

                    {/* 📜 Scrollable List */}
                    <div className="max-h-96 overflow-y-auto py-2">
                        {isLoading ? (
                            <p className="p-3 text-sm text-gray-500 text-center">
                                Loading...
                            </p>
                        ) : notifications.length === 0 ? (
                            <p className="p-3 text-sm text-gray-500 text-center">
                                No notifications
                            </p>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n._id}
                                    onClick={() => handleClick(n)}
                                    className={`cursor-pointer p-4 my-2 transition rounded-md
                    ${!n.isRead
                                            ? "bg-orange-100 font-semibold"
                                            : "bg-base-200"
                                        }
                    hover:bg-gray-100`}
                                >
                                    <p>{n.title}</p>
                                    <p className="text-sm text-gray-600">{n.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(n.createdAt).toLocaleString()}
                                    </p>
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
