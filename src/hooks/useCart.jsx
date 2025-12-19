import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



const useCart = (email) => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["cart", email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get("/cart", {
                params: { email }
            });
            return res.data.cartItems;
        },
    });
};

export default useCart;
