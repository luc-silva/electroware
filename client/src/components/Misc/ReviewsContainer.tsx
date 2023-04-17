import React, { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { ReviewCard } from "../Cards/ReviewCard";
import { ReviewForm } from "../Forms/ReviewForm";
import styles from "./ReviewsContainer.module.css";

export const ReviewsContainer = ({
    product,
    user,
}: {
    product: Product;
    user: UserProps;
}) => {
    let [reviews, setReviews] = useState([{ _id: "" }]);

    useEffect(() => {
        if (product._id) {
            updateReviews();
        }
    }, [product]);
    async function updateReviews() {
        ProductService.getProductReviews(product._id).then(setReviews);
    }
    return (
        <>
            <div className={styles["ratings-container"]}>
                {(reviews.length > 0 &&
                    reviews.map(({ _id }, index: React.Key) => {
                        return (
                            <ReviewCard
                                user={user}
                                reviewId={_id}
                                key={index}
                                updateReviews={updateReviews}
                            />
                        );
                    })) || <p>Sem avaliações para exibir</p>}
            </div>
            <ReviewForm
                updateReviews={updateReviews}
                product={product}
                user={user}
            />
        </>
    );
};
