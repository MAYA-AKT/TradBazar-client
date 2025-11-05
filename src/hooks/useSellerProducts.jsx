import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useSellerProducts = (status,searchText) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    console.log('status-searchText',status,searchText);
    
    const { data: MyProducts = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["MyProducts", user?.email, status, searchText],
        enabled: !!user?.email,
        queryFn: async () => {
            let url = `/products/seller?email=${user?.email}`;

            if (status && status !== "All") {
                url += `&status=${status}`;
            }

            if (searchText) {
                url += `&search=${encodeURIComponent(searchText)}`;
            }

            const res = await axiosSecure.get(url);
            return res.data;
        },
    });

    return { MyProducts, isLoading, isError, refetch };
};

export default useSellerProducts;