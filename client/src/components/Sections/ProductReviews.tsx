import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import styles from "./ProductReviews.module.css";
import { ReviewsContainer } from "../Misc/ReviewsContainer";
import { productRatingInitialState } from "../../constants/initialStates";
import { ScoreDisplay } from "../Displays/ScoreDisplay";

export const ProductReviews = ({
    user,
    product,
}: {
    user: IUserSession;
    product: IProductDetails;
}) => {
    let [data, setData] = useState(productRatingInitialState);
    function updateProductScore() {
        ProductService.getProductScore(product._id).then((data) => {
            setData(data);
        });
    }
    useEffect(() => {
        if (product._id) {
            updateProductScore();
        }
    }, [product]);

    return (
        <section className={styles["ratings"]}>
            <div className={styles["ratings__main"]}>
                <div className={styles["ratings__title"]}>
                    <h2>Avaliações do produto</h2>
                </div>
                <div className={styles["ratings__score"]}>
                    <ScoreDisplay data={data} />
                </div>
            </div>
            <div className={styles["ratings__reviews"]}>
                <ReviewsContainer
                    user={user}
                    product={product}
                    updateScore={updateProductScore}
                />
            </div>
        </section>
    );
};
