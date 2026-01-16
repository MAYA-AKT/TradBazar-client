import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSellerEarningsByDate = (sellerEmail, month, year) => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["seller-earnings-date", sellerEmail, month, year],
        enabled: !!sellerEmail && !!month && !!year,
        queryFn: async () => {
            const res = await axiosSecure.get("/seller/earnings-by-date", {
                params: { sellerEmail, month, year }
            });
            return res.data.earnings || [];
        },
    });
};

export default useSellerEarningsByDate;
