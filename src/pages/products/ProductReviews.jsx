
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpiner from "../error pages/LoadingSpiner";
import toast from 'react-hot-toast';
import useAuth from "../../hooks/useAuth";
import useReview from "../../hooks/useReview";


const ProductReviews = ({product}) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const { reviews, reviewLoading, reviewError,refetch } = useReview(product?._id);
     
    // Calculate average rating
    const average =
        reviews?.length > 0
            ? (reviews?.reduce((acc, r) => acc + r.rating, 0) / reviews?.length).toFixed(1)
            : 0;


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rating || !comment) {
            return toast("Please add rating and comment");
        }

        try {
            const reviewData = {
                productId: product?._id,
                userEmail: user?.email,
                rating,
                comment,
            };
             console.log(reviewData);
             
            const res = await axiosSecure.post("/reviews", reviewData);

            if (res.data.insertedId || res.data.acknowledged) {
                toast("Review submitted successfully!");
                setRating(0);
                setComment("");
                 refetch(); 
            }

        } catch (err) {
            console.error(err);

           
        }
    };


    if (reviewError || reviewLoading) {
        return <LoadingSpiner />
    }





    return (
        <div className="bg-gray-100 py-10">
            <div className="bg-white max-w-7xl mx-auto p-6 shadow-sm">

                <div className="flex flex-col md:flex-row justify-between gap-8">


                    <div className="flex flex-col items-center w-full md:w-1/3">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Customer Reviews
                        </h2>
                        <p className="text-5xl font-bold mt-2 text-orange-500">
                            {average}
                        </p>

                        {/* Stars */}
                        <div className="flex mt-1">
                            {[1, 2, 3, 4, 5].map(num =>
                                num <= Math.round(average) ? (
                                    <AiFillStar key={num} className="text-orange-400 text-2xl" />
                                ) : (
                                    <AiOutlineStar key={num} className="text-gray-300 text-2xl" />
                                )
                            )}
                        </div>

                        <p className="text-gray-500 mt-2 text-sm">
                            Based on {reviews.length} reviews
                        </p>
                    </div>

                    {/* ---- Rating Progress Bars ---- */}
                    <div className="w-full md:w-2/3 space-y-2 mt-4 md:mt-0">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = reviews.filter((r) => r.rating === star).length;
                            const percent = reviews.length
                                ? (count / reviews.length) * 100
                                : 0;

                            return (
                                <div key={star} className="flex items-center gap-3">
                                    <div className="text-sm font-medium w-10">{star}★</div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full bg-orange-400"
                                            style={{ width: `${percent}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-sm text-gray-500 w-8 text-right">
                                        {count}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <hr className="my-8" />

                {/* -------- REVIEWS LIST -------- */}
                <div className="space-y-6">
                    {reviews.length === 0 ? (
                        <p className="text-gray-500">No reviews for this product yet.</p>
                    ) : (
                        reviews?.map((review, index) => (
                            <div
                                key={index}
                                className="border-b pb-5 flex gap-4 items-start"
                            >
                                <img
                                    src={review.avatar}
                                    className="w-12 h-12 rounded-full object-cover shadow"
                                />

                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-md font-semibold text-gray-800">
                                            {review.name}
                                        </h4>
                                        <span className="text-sm text-gray-400">
                                            {new Date(review.date).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map(num =>
                                            num <= review.rating ? (
                                                <AiFillStar
                                                    key={num}
                                                    className="text-yellow-400 text-xl"
                                                />
                                            ) : (
                                                <AiOutlineStar
                                                    key={num}
                                                    className="text-gray-300 text-xl"
                                                />
                                            )
                                        )}
                                    </div>

                                    <p className="text-gray-700 mt-2 leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* -------- ADD REVIEW -------- */}
                <div className="mt-10">
                    <h3 className="text-lg font-semibold mb-3">
                        Write a Review
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="font-medium">Rating : </label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="border border-gray-200 pl-4 rounded"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Comment</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="border border-gray-200 p-2 rounded w-full"
                            ></textarea>
                        </div>

                        <button className="bg-orange-500 text-white px-4 py-2 rounded">
                            Submit Review
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default ProductReviews;


