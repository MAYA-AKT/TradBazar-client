import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAdminOverview = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: overview = {},
        isLoading: overviewLoading,
        isError: overviewError,
        refetch,
    } = useQuery({
        queryKey: ['adminOverview'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/stats'); // your API endpoint
            return res.data;
        },
    });

    return { overview, overviewLoading, overviewError, refetch };
};

export default useAdminOverview;
