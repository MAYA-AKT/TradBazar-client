import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTrackOrder = (orderId) => {
    const axiosSecure = useAxiosSecure();

    const query = useQuery({
        queryKey: ["trackOrder", orderId],
        enabled: !!orderId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyer/order/${orderId}`);
            return res.data.order;
        }
    });

    return {
        order: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        refetch: query.refetch,
    };
};

export default useTrackOrder;
