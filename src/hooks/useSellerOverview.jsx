import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSellerOverview = (email) => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading, isError, refetch } = useQuery({
    queryKey: ["sellerOverview", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller/overview?email=${email}`);
      return res.data;
    },
  });

  return { overview: data, isLoading, isError, refetch };
};

export default useSellerOverview;
