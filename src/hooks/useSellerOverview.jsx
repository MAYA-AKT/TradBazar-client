import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useSellerOverview = (sellerEmail) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: overview = {},
    isLoading: overviewLoading,
    isError: overviewError,
    refetch,
  } = useQuery({
    queryKey: ['sellerOverview', sellerEmail],
    enabled: !!sellerEmail, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller/stats?sellerEmail=${sellerEmail}`);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return { overview, overviewLoading, overviewError, refetch };
};

export default useSellerOverview;
