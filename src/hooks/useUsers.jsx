import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = (searchText = "") => {
    const axiosSecure = useAxiosSecure();

    const {
        data: users = [],
        isError,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["users", searchText],
        queryFn: async () => {
            // Send the searchText in the query string, as your backend expects
            const res = await axiosSecure.get(`/users?searchText=${encodeURIComponent(searchText)}`);
            return res.data;
        },
        keepPreviousData: true,
        staleTime: 1000 * 30,
    });

    return { users, isLoading, isError, refetch };
};

export default useUsers;
