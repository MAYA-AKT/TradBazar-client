import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSellerEarnings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    return useQuery({
        queryKey: ["seller-earnings", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/seller/earnings-summary?sellerEmail=${user.email}`
            );
            return res.data.data;
        }
    });
};

export default useSellerEarnings;
