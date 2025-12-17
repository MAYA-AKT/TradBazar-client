import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSellerOrders = (sellerEmail, page = 1, limit = 10) => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["seller-orders", sellerEmail, page],
        queryFn: async () => {
            const res = await axiosSecure.get("/seller/orders", {
                params: {  sellerEmail, page, limit },
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

export default useSellerOrders;
