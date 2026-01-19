import { useEffect, useRef, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useNotifications from "../../hooks/useNotifications";

const NotificationDropdown = ({ userEmail }) => {
    const [open, setOpen] = useState(false);
    const [reply, setReply] = useState({});
    const [replyingId, setReplyingId] = useState(null);

    const axiosSecure = useAxiosSecure();
    const { notifications = [], setNotifications, isLoading, refetch } = useNotifications(userEmail);

    const dropdownRef = useRef(null);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    // 🔔 Mark as read & navigate for normal notifications
    const handleClick = async (n) => {
        if (n.isRead || n.type === "ask-seller") {
            setOpen(false);
            return;
        }

        // ⚡ Optimistic UI update
        setNotifications((prev) =>
            prev.map((item) => (item._id === n._id ? { ...item, isRead: true } : item))
        );

        try {
            await axiosSecure.patch(`/notifications/read/${n._id}`);
            setOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    // 🔹 Seller Reply function
    const handleReply = async (notification) => {
        const answer = reply[notification._id];
        if (!answer?.trim()) return;

        try {
            setReplyingId(notification._id);

            await axiosSecure.post("/notifications/reply-seller", {
                notificationId: notification._id,
                buyerEmail: notification.buyerEmail,
                sellerEmail: userEmail,
                productId: notification.productId,
                reply: answer,
            });

            // Optimistic UI update for replied
            setNotifications((prev) =>
                prev.map((n) =>
                    n._id === notification._id
                        ? { ...n, replied: true }
                        : n
                )
            );

            setReply((prev) => ({ ...prev, [notification._id]: "" }));
        } catch (error) {
            console.error("Reply failed", error);
        } finally {
            setReplyingId(null);
        }
    };

    // 🔹 Close dropdown on outside click
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    // 🔹 Refetch notifications when dropdown opens
    useEffect(() => {
        if (open) {
            refetch();
        }
    }, [open, refetch]);

    // 🔹 Close dropdown on ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* 🔔 Icon */}
            <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
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
                    <h4 className="font-semibold p-3 text-gray-700 text-center">Notifications</h4>
                    <hr className="text-gray-200 mx-2" />

                    {/* 📜 Scrollable List */}
                    <div className="max-h-96 overflow-y-auto py-2">
                        {isLoading ? (
                            <p className="p-3 text-sm text-gray-500 text-center">Loading...</p>
                        ) : notifications.length === 0 ? (
                            <p className="p-3 text-sm text-gray-500 text-center">No notifications</p>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n._id}
                                    onClick={() => {
                                        if (n.type !== "ask-seller") handleClick(n);
                                    }}
                                    className={`p-4 my-2 transition rounded-md cursor-pointer
                    ${!n.isRead ? "bg-orange-100 font-semibold" : "bg-base-200"}
                    hover:bg-gray-100`}
                                >
                                    <p className="font-medium">{n.title}</p>
                                    <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                                    {n.productName && (
                                        <p className="text-xs text-gray-500 mt-1">Product: {n.productName}</p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(n.createdAt).toLocaleString()}
                                    </p>

                                    {/* 🔹 SELLER REPLY UI */}
                                    {n.type === "ask-seller" && !n.replied && (
                                        <div className="mt-3">
                                            <textarea
                                                className="w-full border rounded p-2 text-sm"
                                                placeholder="Write your reply..."
                                                value={reply[n._id] || ""}
                                                onChange={(e) =>
                                                    setReply({ ...reply, [n._id]: e.target.value })
                                                }
                                            />
                                            <button
                                                onClick={() => handleReply(n)}
                                                disabled={replyingId === n._id}
                                                className="mt-2 bg-green-600 text-white font-bold px-3 py-1 rounded text-sm disabled:opacity-50"
                                            >
                                                {replyingId === n._id ? "Sending..." : "Send Reply"}
                                            </button>
                                        </div>
                                    )}

                                    {/* ✔ Already replied */}
                                    {n.type === "ask-seller" && n.replied && (
                                        <p className="text-green-600 text-xs mt-2">✔ Replied</p>
                                    )}
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
