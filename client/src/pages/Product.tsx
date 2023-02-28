import styles from "./Product.module.css";
import { Star } from "phosphor-react";
import { productProductPage, productsReviews } from "../testData";
import { format } from "date-fns";

export const Product = () => {
    return (
        <main className={styles["product"]}>
            <section className={styles["product-about"]}>
                <div className={styles["product-image"]}>
                    {/* <img src="" alt="" /> */}
                </div>
                <div className={styles["product-details"]}>
                    <div className={styles["details-info"]}>
                        <div className={styles["details-title"]}>
                            <h1>{productProductPage.productName}</h1>
                            Tech, Tools
                        </div>
                        <div className={styles["details-pricing"]}>
                            <div>
                                <div>Reputation: 4.0</div>
                                <a>Seller: Jorgim</a>
                            </div>
                            <h2>31.04 $</h2>
                        </div>
                        <div className={styles["details-description"]}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Id, magni obcaecati! Doloribus, soluta at error amet
                            voluptate facere non eos molestiae eius, eligendi
                            tempore ullam, expedita sapiente libero. Cum, tempora.
                        </div>
                    </div>
                    <div className={styles["details-misc"]}>
                        <p>Available: 40</p>
                        <button>Add to cart</button>
                    </div>
                </div>
            </section>
            <section className={styles["ratings"]}>
                <h2>
                    Product Ratings
                    <div>
                        4/5
                    </div>
                </h2>
                <div className={styles["ratings-container"]}>
                    {productsReviews.map(({rating, reviewText, user, reviewDate}) => {
                        return (
                            <div className={styles["rating-card"]}>
                                <div className={styles["card-userinfo"]}>
                                    <div className={styles["user-photo"]}>
                                        {/* <img src="" alt="" /> */}
                                    </div>
                                    <div>
                                        Rating:
                                        {rating}
                                    </div>
                                </div>
                                <div className={styles["user-review"]}>
                                    <div className={styles["review-detail"]}>
                                        <div>{user}</div>
                                        <div>{format(reviewDate, "dd/MM/yyyy")}</div>
                                    </div>
                                    <div>
                                        {reviewText}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    );
};
