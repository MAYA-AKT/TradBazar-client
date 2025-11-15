import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useReview = (productId) => {
    const axiosSecure = useAxiosSecure();

    const {
        data: reviews = [],
        isLoading:reviewLoading,
        isError:reviewError,
        refetch,
    } = useQuery({
        queryKey: ["reviews", productId],
        enabled: !!productId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${productId}`);
            return res.data;
        },
    });

    return { reviews, reviewLoading, reviewError, refetch };
};

export default useReview;