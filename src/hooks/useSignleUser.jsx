import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useSignleUser = (email) => {
     const axiosSecure = useAxiosSecure();

    const {
        data: signleUser = [],
        isError,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["user", email],
        queryFn: async () => {
            
            const res = await axiosSecure.get(`/users/${email}`);
            return res.data;
        },
       
    });

    return { signleUser, isLoading, isError, refetch };
};

export default useSignleUser;