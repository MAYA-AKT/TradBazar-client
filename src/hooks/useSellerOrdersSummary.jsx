import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSellerOrdersSummary = (sellerEmail, page = 1, limit = 6, filterStatus = "All") => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["seller-orders-summary", sellerEmail, page, filterStatus],
        queryFn: async () => {
            const res = await axiosSecure.get("/seller/orders-summary", {
                params: { sellerEmail, page, limit, status: filterStatus },
            });
            return res.data;
        },
        keepPreviousData: true,
    });

    return {
        orders: data?.orders || [],
        totalPages: data?.totalPages || 1,
        isLoading,
        isError,
        refetch,
    };
};

export default useSellerOrdersSummary;
