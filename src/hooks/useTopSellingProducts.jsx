import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useTopSellingProducts = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: topSellingProducts = [],
        isLoading: topSellingLoading,
        isError: topSellingError,
        refetch,
    } = useQuery({
        queryKey: ["topSellingProducts"],
        queryFn: async () => {
            const res = await axiosSecure.get("/top-selling");
            return res.data;
        },
    });

    return {
        topSellingProducts,
        topSellingLoading,
        topSellingError,
        refetch,
    };
};

export default useTopSellingProducts;
