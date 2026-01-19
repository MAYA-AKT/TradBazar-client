import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSellerOrdersSummary = (sellerEmail) => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["seller-orders-summary", sellerEmail],
        queryFn: async () => {
            const res = await axiosSecure.get("/seller/orders-summary", {
                params: { sellerEmail },
            });
            return res.data;
        },
        keepPreviousData: true,
    });

    return {
        orders: data?.orders || [],
      
        isLoading,
        isError,
        refetch,
    };
};

export default useSellerOrdersSummary;
