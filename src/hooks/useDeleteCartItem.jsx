import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDeleteCartItem = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartId) =>
            axiosSecure.delete(`/cart/${cartId}`),

        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
        }
    });
};

export default useDeleteCartItem;
