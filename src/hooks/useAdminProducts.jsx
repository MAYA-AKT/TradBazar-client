import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useProducts = (status, searchText, page = 1, limit = 10) => {
    const axiosSecure = useAxiosSecure();

    const {
        data = {},
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["products", status, searchText, page, limit],
        queryFn: async () => {
            let endpoint = `/admin/products?page=${page}&limit=${limit}`;

            if (status && status !== "all") {
                endpoint += `&status=${status}`;
            }

            if (searchText) {
                endpoint += `&search=${encodeURIComponent(searchText)}`;
            }

            const res = await axiosSecure.get(endpoint);
            return res.data;
        },
        keepPreviousData: true,
    });

    return {
        products: data.products || [],
        totalProducts: data.totalProducts || 0,
        totalPages: data.totalPages || 0,
        isLoading,
        isError,
        refetch,
    };
};

export default useProducts;
