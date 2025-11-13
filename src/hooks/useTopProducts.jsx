import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTopProducts = () => {
    const axiosSecure = useAxiosSecure();
    const { data: topProducts = [], isLoading, isError } = useQuery({
        queryKey: ["topProducts"],
        queryFn: async () => {
            const res = await axiosSecure.get("/products/top");
            return res.data;
        },
    });

    return { topProducts, isLoading, isError };
};

export default useTopProducts;