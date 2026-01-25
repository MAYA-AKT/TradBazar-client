import { useParams } from "react-router";
import LoadingSpiner from "../error pages/LoadingSpiner";
import ProductReviews from "./ProductReviews";
import DisplayProduct from "./DisplayProduct";
import ReletedProducts from "./ReletedProducts";
import CategoryBadge from "../../components/dashboard/userdashboard/categoryBadge/CategoryBadge";
import useReview from "../../hooks/useReview";
import useProduct from "../../hooks/useProduct";
import AuthenticityAndSellerStory from "./AuthenticityAndSellerStory";
import { useTitle } from "../../hooks/useTitle";







const ProductDetails = () => {
    // dynamic title
    useTitle('Product details');

    const { id } = useParams();

    const { product, productLoading, productError } = useProduct(id);
    const { reviews, reviewLoading, reviewError } = useReview(product?._id);


    



    if (productError || productLoading || reviewLoading || reviewError) {
        return <LoadingSpiner />
    }
    return (
        <>
            {/* Category Badge */}
            <CategoryBadge />

            <DisplayProduct product={product} reviews={reviews} />

           



            <AuthenticityAndSellerStory product={product} />

            <ReletedProducts productId={id} category={product.category} />
            <ProductReviews product={product} />



        </>
    );
};

export default ProductDetails;