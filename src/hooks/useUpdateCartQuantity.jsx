import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUpdateCartQuantity = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ cartId, action }) =>
            axiosSecure.patch(`/cart/${cartId}`, { action }),

        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
        }
    });
};

export default useUpdateCartQuantity;
