import React, { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";

import { ReviewCard } from "../Cards/ReviewCard";
import { ReviewForm } from "../Forms/ReviewForm";
import { checkForUser } from "../../utils/operations";

import styles from "./ReviewsContainer.module.css";

export const ReviewsContainer = ({
    product,
    user,
    updateScore,
}: {
    product: IProductDetails;
    user: IUserSession;
    updateScore: Function;
}) => {
    let [reviews, setReviews] = useState([{ _id: "", author: "" }]);
    let [userHasNotReviewed, toggleUserHasNotReviewed] = useState(false);

    async function updateReviews() {
        ProductService.getProductReviews(product._id)
            .then(setReviews)
            .then(() => {
                updateScore();
            });
    }

    useEffect(() => {
        if (product._id) {
            updateReviews();
        }
    }, [product]);
    useEffect(() => {
        if (checkForUser(reviews, user.id)) {
            toggleUserHasNotReviewed(true);
        } else {
            toggleUserHasNotReviewed(false);
        }
    }, [reviews]);
    return (
        <>
            <div className={styles["reviews__container"]}>
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

            <div className={styles["reviews__form"]}>
                <ReviewForm
                    updateReviews={updateReviews}
                    product={product}
                    user={user}
                    isActive={userHasNotReviewed}
                />
            </div>
        </>
    );
};
