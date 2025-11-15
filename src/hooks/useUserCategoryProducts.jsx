import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserCategoryProducts = (category) => {
    const axiosSecure = useAxiosSecure();

    const { data: products = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["categoryProducts", category],
        enabled: !!category, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/category?name=${category}`);
            return res.data;
        },
    });

    return { products, isLoading, isError, refetch };
};

export default useUserCategoryProducts;