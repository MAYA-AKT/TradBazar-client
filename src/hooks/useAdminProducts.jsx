import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useProducts = (status, searchText) => {


    const axiosSecure = useAxiosSecure();
    const { data: products = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["products", status, searchText], 
        queryFn: async () => {
            let endpoint = "/admin/products?";
            if (status && status !== "all") {
                endpoint += `status=${status}&`;
            }
            if (searchText) {
                endpoint += `search=${encodeURIComponent(searchText)}`;
            }

            console.log("Fetching products from:", endpoint); 
            const res = await axiosSecure.get(endpoint);
            return res.data;
        },
        keepPreviousData: true,
    });

    return { products, isLoading, isError, refetch };
};

export default useProducts;