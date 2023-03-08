import styles from "./Product.module.css";
import { Star } from "phosphor-react";
import { productsReviews } from "../testData";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Product = ({user, setUser}: { user: UserProps; setUser: Function }) => {
    let { id } = useParams();
    let productInitialState: Product = {
        _id: "",
        category: "",
        name: "",
        description: "",
        owner: "",
        price: 0,
        quantity: 0,
        reviews: 0,
    };
    let [productDetails, setProductDetails] = useState(productInitialState);
    useEffect(() => {
        axios
            .get(`http://localhost:6060/api/product/${id}`)
            .then(({ data }) => {
                setProductDetails(data);
            });
    }, [id]);
    return (
        <main className={styles["product"]}>
            <section className={styles["product-about"]}>
                <div className={styles["product-image"]}>
                    {/* <img src="" alt="" /> */}
                </div>
                <div className={styles["product-details"]}>
                    <div className={styles["details-info"]}>
                        <div className={styles["details-title"]}>
                            <h1>{productDetails.name}</h1>
                            Tech, Tools
                        </div>
                        <div className={styles["details-pricing"]}>
                            <div>
                                <div>Reputation: 4.0</div>
                                <a>{`Seller: ${productDetails.owner}`}</a>
                            </div>
                            <h2>{`${productDetails.price}$`}</h2>
                        </div>
                        <div className={styles["details-description"]}>
                            {productDetails.description ||
                                "Nenhuma descricao disponivel"}
                        </div>
                    </div>
                    <div className={styles["details-misc"]}>
                        <p>{`Available: ${productDetails.quantity}`}</p>
                        <button>Add to cart</button>
                    </div>
                </div>
            </section>
            <section className={styles["ratings"]}>
                <div className={styles["ratings-title"]}>
                    <h2>Avaliacoes do produto</h2>
                    <div>4/5</div>
                </div>
                <div className={styles["ratings-container"]}>
                    {productsReviews.map(
                        ({ rating, reviewText, user, reviewDate }, index) => {
                            return (
                                <div
                                    className={styles["rating-card"]}
                                    key={index}
                                >
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
                                        <div
                                            className={styles["review-detail"]}
                                        >
                                            <strong>{user}</strong>
                                            <p>
                                                {format(
                                                    reviewDate,
                                                    "dd/MM/yyyy"
                                                )}
                                            </p>
                                        </div>
                                        <div
                                            className={
                                                styles["user-review-text"]
                                            }
                                        >
                                            {reviewText}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </section>
        </main>
    );
};
