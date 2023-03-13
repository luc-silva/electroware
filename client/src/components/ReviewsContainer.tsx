import axios from "axios";
import { useEffect, useState } from "react";
import { ReviewCard } from "./ReviewCard";
import styles from "./ReviewsContainer.module.css";

export const ReviewsContainer = ({ productId }: { productId?: string }) => {
    let [productReviews, setProductReviews] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:6060/api/product/${productId}/reviews`)
            .then(({ data }) => {
                setProductReviews(data);
            });
    }, [productId]);
    return (
        <div className={styles["ratings-container"]}>
            {productReviews.map(
                (
                    {
                        score,
                        text,
                        author,
                        createdAt,
                        product,
                        productOwner,
                        authorUsername,
                    }: Review,
                    index: React.Key
                ) => {
                    return (
                        <ReviewCard
                            author={author}
                            authorUsername={authorUsername}
                            product={product}
                            productOwner={productOwner}
                            text={text}
                            score={score}
                            createdAt={createdAt}
                            key={index}
                        />
                    );
                }
            )}
        </div>
    );
};
