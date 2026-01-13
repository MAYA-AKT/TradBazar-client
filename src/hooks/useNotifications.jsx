import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useNotifications = (userEmail) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: notifications = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["notifications", userEmail],
    queryFn: async () => {
      if (!userEmail) return [];
      const res = await axiosSecure.get(`/notifications/${encodeURIComponent(userEmail)}`);
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 30, 
    enabled: !!userEmail, 
  });

  return { notifications, isLoading, isError, refetch };
};

export default useNotifications;
