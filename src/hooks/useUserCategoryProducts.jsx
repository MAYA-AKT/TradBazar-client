import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserCategoryProducts = (decodedCategory, page, limit = 12) => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading, isError, refetch } = useQuery({
        queryKey: ["categoryProducts", decodedCategory , page],
        enabled: !!decodedCategory,
         keepPreviousData: true,
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/category?name=${encodeURIComponent(decodedCategory)}&page=${page}&limit=${limit}`);
            return res.data;
        },
    });

    return {
        products: data.products || [],
        total: data.total || 0,
        totalPages: data.totalPages || 1,
        isLoading,
        isError, refetch
    };
};

export default useUserCategoryProducts;