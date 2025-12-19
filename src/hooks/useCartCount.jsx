import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useCartCount = (email) => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["cartCount", email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get("/cart/count", {
                params: { email }
            });
            return res.data.count;
        },
    });
};

export default useCartCount;
