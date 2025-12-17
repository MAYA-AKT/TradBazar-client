import useAxiosSecure from "./useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useShipOrder = (refetch) => {
  const axiosSecure = useAxiosSecure();

  
  const generateTrackingId = () => {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `TRK-${datePart}-${rand}`;
  };

  return useMutation({
    mutationFn: async ({ orderId, courierName }) => {
      const trackingId = generateTrackingId();
      const res = await axiosSecure.patch(`/seller/orders/${orderId}`, {
        trackingId,
        courierName,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Order shipped successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Shipping update failed"
      );
    },
  });
};

export default useShipOrder;
