import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { StarsContainer } from "../components/StarsContainer";
import { ReviewsContainer } from "../components/ReviewsContainer";
import { ReviewForm } from "../components/ReviewForm";
import { ProductBtnPanel } from "../components/ProductBtnPanel";
import { Bookmark } from "phosphor-react";
import styles from "./Product.module.css";

export const Product = ({ user }: { user: UserProps }) => {
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
    let [productReviews, setProductReviews] = useState([]);
    let [owner, setOwner] = useState({ first: "", last: "" });
    let [category, setCategory] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:6060/api/product/${id}`)
            .then(({ data }) => {
                setProductDetails(data);
            });
        updateReviews();
    }, [id]);
    axios
        .get(`http://localhost:6060/api/user/${productDetails.owner}`)
        .then(({ data }) => {
            setOwner(data.name);
        });
    axios
        .get(
            `http://localhost:6060/api/category/${productDetails.category}`
        )
        .then(({ data }) => {
            setCategory(data.name);
        });

    useEffect(() => {
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
    async function updateReviews() {
        axios
            .get(`http://localhost:6060/api/product/${id}/reviews`)
            .then(({ data }) => {
                console.log(data);
                setProductReviews(data);
            });
    }
    async function handleWishlist() {
        axios.post(
            `http://localhost:6060/api/wishlist/`,
            {
                product: productDetails._id,
            },
            { headers: { Authorization: `Bearer ${user.token}` } }
        );
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
                            <div>
                                <h1>{productDetails.name}</h1>
                                <em>
                                    <Link
                                        to={`/category/${productDetails.category}`}
                                    >
                                        {category}
                                    </Link>
                                </em>
                            </div>
                            {user.logged && user.id != productDetails.owner && (
                                <div onClick={handleWishlist}>
                                    <Bookmark
                                        size={35}
                                        color="var(--main-color)"
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles["details-pricing"]}>
                            <div>
                                <p>
                                    {`Vendedor: `}
                                    <Link
                                        to={`/user/${productDetails.owner}`}
                                    >{`${owner.first} ${owner.last}`}</Link>
                                </p>
                                <div>Reputação: 4.0</div>
                            </div>
                            <h2>{`${productDetails.price}$`}</h2>
                        </div>
                        <div className={styles["details-description"]}>
                            {productDetails.description ||
                                "Nenhuma descrição disponível"}
                        </div>
                    </div>
                    <div className={styles["details-misc"]}>
                        <p>{`Unidades disponíveis: ${productDetails.quantity}`}</p>
                        <ProductBtnPanel user={user} product={productDetails} />
                    </div>
                </div>
            </section>
            <section className={styles["product__ratings"]}>
                <div className={styles["ratings-main"]}>
                    <div className={styles["ratings__title"]}>
                        <h2>Avaliações do produto</h2>
                    </div>
                    <div className={styles["ratings__score"]}>
                        <strong>{getRatingAverage()}/5</strong>
                        <div>
                            <StarsContainer
                                size={30}
                                stars={getRatingAverage()}
                            />
                        </div>
                    </div>
                </div>
                <ReviewsContainer reviews={productReviews} />
                <ReviewForm
                    product={productDetails}
                    updateReviews={updateReviews}
                    user={user}
                />
            </section>
        </main>
    );
};
