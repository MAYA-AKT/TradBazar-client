import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSellerProducts = (status, searchText, page = 1, limit = 8) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data = {}, isLoading, isError, refetch } = useQuery({
        queryKey: ["MyProducts", user?.email, status, searchText, page],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/products/seller", {
                params: {
                    email: user?.email,
                    status,
                    search: searchText,
                    page,
                    limit,
                },
            });
            return res.data;
        },
    });

    return {
        MyProducts: data.products || [],
        totalPages: data.totalPages || 1,
        totalProducts: data.totalProducts || 0,
        isLoading,
        isError,
        refetch,
    };
};

export default useSellerProducts;
