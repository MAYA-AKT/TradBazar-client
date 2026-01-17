import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCategories = (page = 1, limit = 10) => {
    const axiosSecure = useAxiosSecure();

    const {
        data = {},
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["categories", page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/categories?page=${page}&limit=${limit}`
            );
            return res.data;
        },
        keepPreviousData: true,
    });

    return {
        categories: data.categories || [],
        totalCategories: data.totalCategories || 0,
        totalPages: data.totalPages || 0,
        isLoading,
        isError,
        refetch,
    };
};

export default useCategories;
