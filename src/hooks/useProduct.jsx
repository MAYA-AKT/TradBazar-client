import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useProduct = (id) => {
   const axiosSecure = useAxiosSecure();
    const { data: product, isLoading:productLoading, isError:productError, refetch } = useQuery({
        queryKey: ["product"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/product/${id}`);
            return res.data;
        },
    });

    return { product, productLoading, productError, refetch };
};

export default useProduct;