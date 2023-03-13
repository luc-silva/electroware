import styles from "./Product.module.css";
import { Star } from "phosphor-react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { StarsContainer } from "../components/StarsContainer";
import { ReviewCard } from "../components/ReviewCard";
import { ReviewsContainer } from "../components/ReviewsContainer";

export const Product = ({
    user,
    setUser,
}: {
    user: UserProps;
    setUser: Function;
}) => {
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
    let [owner, setOwner] = useState({ first: "", last: "" });
    let [productDetails, setProductDetails] = useState(productInitialState);
    let [productReviews, setProductReviews] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:6060/api/product/${id}`)
            .then(({ data }) => {
                setProductDetails(data);
            });
    }, [id]);
    useEffect(() => {
        axios
            .get(`http://localhost:6060/api/product/${id}/reviews`)
            .then(({ data }) => {
                setProductReviews(data);
            });
    }, [id]);
    useEffect(() => {
        axios
            .get(`http://localhost:6060/api/user/${productDetails.owner}`)
            .then(({ data }) => {
                setOwner(data.name);
            });
    }, [productDetails]);

    function getRatingAverage() {
        let total = 0;
        productReviews.forEach((review: Review) => {
            total += review.score;
        });
        return total === 0
            ? 0
            : Number((total / productReviews.length).toFixed(1));
    }

    return (
        <main className={styles["product"]}>
            <section className={styles["product__about"]}>
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
                                <a>{`Seller: ${owner.first} ${owner.last}`}</a>
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
            <section className={styles["product__ratings"]}>
                <div className={styles["ratings-main"]}>
                    <div className={styles["ratings__title"]}>
                        <h2>Avaliacoes do produto</h2>
                    </div>
                    <div className={styles["ratings__score"]}>
                        <strong>{getRatingAverage()}/5</strong>
                        <div>
                            <StarsContainer
                                size={20}
                                stars={getRatingAverage()}
                            />
                        </div>
                    </div>
                </div>
                <ReviewsContainer productId={id} />
            </section>
        </main>
    );
};
