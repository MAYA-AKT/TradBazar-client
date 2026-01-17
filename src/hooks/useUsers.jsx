import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = (searchText = "", page = 1, limit = 8) => {
    const axiosSecure = useAxiosSecure();

    const {
        data = {},
        isError,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["users", searchText, page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/users?searchText=${encodeURIComponent(searchText)}&page=${page}&limit=${limit}`
            );
            return res.data;
        },
        keepPreviousData: true,
        staleTime: 1000 * 30,
    });

    return {
        users: data.users || [],
        totalPages: data.totalPages || 0,
        totalUsers: data.totalUsers || 0,
        isLoading,
        isError,
        refetch,
    };
};

export default useUsers;
