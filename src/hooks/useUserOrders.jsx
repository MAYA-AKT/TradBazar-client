import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserOrders = (email, page = 1, limit = 10) => {
    const axiosSecure = useAxiosSecure();

   const {
        data,
        isLoading,
        isError,
        refetch
    } = useQuery({
        queryKey: ["buyerOrders", email, page, limit],
        enabled: !!email,
        keepPreviousData: true,
        queryFn: async () => {
            const res = await axiosSecure.get("/buyer/orders", {
                params: { email, page, limit }
            });
            return res.data;
        }
    });

    return {
        orders: data?.orders || [],
        totalPages: data?.totalPages || 1,
        isLoading,
        isError,
        refetch
    };
};


export default useUserOrders;
