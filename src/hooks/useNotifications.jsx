import useAxiosSecure from "./useAxiosSecure";
import { useState, useEffect, useCallback } from "react";

const useNotifications = (userEmail) => {
  const axiosSecure = useAxiosSecure();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 🔔 extract fetch logic
  const fetchNotifications = useCallback(async () => {
    if (!userEmail) return;

    setIsLoading(true);
    try {
      const res = await axiosSecure.get(`/notifications/${userEmail}`);
      setNotifications(res.data);
    } catch (error) {
      console.error("Notification fetch failed", error);
    } finally {
      setIsLoading(false);
    }
  }, [userEmail, axiosSecure]);

  // initial fetch
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    setNotifications,
    isLoading,
    refetch: fetchNotifications, // 🔥 THIS FIXES RELOAD ISSUE
  };
};

export default useNotifications;
