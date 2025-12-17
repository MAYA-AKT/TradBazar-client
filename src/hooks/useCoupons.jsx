// src/hooks/useCoupons.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCoupons = (page = 1, search = "") => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["coupons", page, search],
        queryFn: async () => {
            const res = await axiosSecure.get("/coupons", {
                params: { page, search },
            });
            return res.data;
        },
        keepPreviousData: true, // useful for pagination
    });

    return {
        coupons: data?.coupons || [],
        totalPages: data?.totalPages || 1,
        isLoading,
        isError,
        error,
        refetch,
    };
};

export default useCoupons;
