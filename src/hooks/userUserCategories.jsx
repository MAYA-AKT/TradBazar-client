import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUserCategories = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: categories = [],
        isLoading,
        isError,
        refetch
    } = useQuery({
        queryKey: ["user-categories"],
        queryFn: async () => {
            const res = await axiosSecure.get("/user-categories");
            return res.data;   // ✅ FIX HERE
        },
    });

    return { categories, isLoading, isError, refetch };
};

export default useUserCategories;
