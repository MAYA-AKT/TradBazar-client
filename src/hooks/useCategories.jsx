import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useCategories = () => {
    const axiosSecure = useAxiosSecure();
    const { data: categories = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/categories`);
            return res.data;
        },
    });

    return { categories, isLoading, isError, refetch };
};

export default useCategories;