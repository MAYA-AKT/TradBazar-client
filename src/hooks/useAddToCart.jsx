import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast";

const useAddToCart = () => {
    
   const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (cartItem) => {
           
            
            const res = await axiosSecure.post("/cart", cartItem);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Added to cart");
            queryClient.invalidateQueries(["cart"]);
            queryClient.invalidateQueries(["cartCount"]);
        },
    });
};

export default useAddToCart;
