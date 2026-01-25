import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCategoryBadge = () => {
    const axiosSecure = useAxiosSecure();

    const {
         data: category,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/category-badge`
            );
            return res.data;
        },
        keepPreviousData: true,
    });

    return {
        category,
        
        isLoading,
        isError,
        refetch,
    };
};

export default useCategoryBadge;