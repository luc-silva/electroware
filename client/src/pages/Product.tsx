import styles from "./Product.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { StarsContainer } from "../components/StarsContainer";
import { ReviewsContainer } from "../components/ReviewsContainer";
import { QuantityCounter } from "../components/QuantityCounter";
import { ReviewForm } from "../components/ReviewForm";

export const Product = ({
    user,
    setUser,
}: {
    user: UserProps;
    setUser: Function;
}) => {
    let { id } = useParams();
    let navigate = useNavigate();
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
    let [quantity, setQuantity] = useState(1);
    let [updateReview, toggleUpdateReview] = useState(false);
    useEffect(() => {
        if (updateReview) {
            toggleUpdateReview(false);
        }
    }, [toggleUpdateReview]);

    function updateWindow() {
        toggleUpdateReview(true);
    }

    useEffect(() => {
        axios
            .get(`http://localhost:6060/api/product/${id}`)
            .then(({ data }) => {
                setProductDetails(data);
            });
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

    useEffect(() => {
        axios
            .get(
                `http://localhost:6060/api/category/${productDetails.category}`
            )
            .then(({ data }) => {
                setCategory(data.name);
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
    function addToShoppingCart(event: React.MouseEvent) {
        let data = {
            owner: user.id,
            product: productDetails._id,
            price: productDetails.price,
            quantity: quantity,
        };
        axios.post(`http://localhost:6060/api/shoppingcart/`, data, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        navigate("/shopping-cart");
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
                            <em>{category}</em>
                        </div>
                        <div className={styles["details-pricing"]}>
                            <div>
                                <p>
                                    {`Vendedor: `}
                                    <Link
                                        to={`user/${productDetails.owner}`}
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
                        {(user.logged && (
                            <div>
                                <QuantityCounter
                                    max={productDetails.quantity}
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                />
                                <button onClick={addToShoppingCart}>
                                    Adicionar ao carrinho
                                </button>
                            </div>
                        )) || (
                            <div>
                                <Link to={"/login"}>
                                    Entre em sua conta para comprar
                                </Link>
                            </div>
                        )}
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
                <ReviewsContainer productId={id} />
                <ReviewForm
                    product={productDetails}
                    user={user}
                    update={updateWindow}
                />
            </section>
        </main>
    );
};
