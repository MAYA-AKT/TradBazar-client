import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {

  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isLoading: roleLoading,
    isError,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role?email=${user?.email}`);
      console.log("Role response:", res.data); // <-- should log { role: "admin" }
      return res.data;
    },
  });

  const role = data?.role;
  const isLoading = authLoading || roleLoading;

  return { role, isLoading, isError };
};

export default useUserRole;