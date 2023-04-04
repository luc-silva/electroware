import { ReviewCard } from "./Cards/ReviewCard";
import styles from "./ReviewsContainer.module.css";

export const ReviewsContainer = ({ reviews }: { reviews: Review[] }) => {
    return (
        <div className={styles["ratings-container"]}>
            {(reviews.length > 0 &&
                reviews.map(
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
                )) || <p>Sem avaliações para exibir</p>}
        </div>
    );
};
