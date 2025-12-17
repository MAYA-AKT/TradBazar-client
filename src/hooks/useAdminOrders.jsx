import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminOrders = () => {
    const axiosSecure = useAxiosSecure();

    const { data: orders, isLoading, isError, refetch } = useQuery({
        queryKey: ["adminOrders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/orders");
            return res.data.orders;
        },
    });

    return { orders, isLoading, isError, refetch };
};

export default useAdminOrders;
