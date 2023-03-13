import styles from "./Product.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { StarsContainer } from "../components/StarsContainer";
import { ReviewsContainer } from "../components/ReviewsContainer";

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
    let [owner, setOwner] = useState({ first: "", last: "" });
    let [productDetails, setProductDetails] = useState(productInitialState);
    let [productReviews, setProductReviews] = useState([]);
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

    function getRatingAverage() {
        let total = 0;
        productReviews.forEach((review: Review) => {
            total += review.score;
        });
        return total === 0
            ? 0
            : Number((total / productReviews.length).toFixed(1));
    }

    let [selectValue, setSelectValue] = useState(1);
    function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
        setSelectValue(Number(event.target.value));
    }

    let [textareaValue, setTextareaValue] = useState("");
    function handleTextarea(event: ChangeEvent<HTMLTextAreaElement>) {
        setTextareaValue(event.target.value);
    }

    function handleReviewSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post(
            `http://localhost:6060/api/review/`,
            {
                author: user.id,
                authorUsername: user.username,
                product: id,
                productOwner: productDetails.owner,
                text: textareaValue,
                score: selectValue,
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        navigate(`/product/${id}`);
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
                {user.logged && (
                    <div className={styles["ratings__form"]}>
                        <form action="POST" onSubmit={handleReviewSubmit}>
                            <textarea
                                name="text"
                                defaultValue={textareaValue}
                                onChange={handleTextarea}
                            />
                            <div>
                                <label htmlFor="score">
                                    <p>Nota:</p>
                                    <select
                                        name="score"
                                        onChange={handleSelect}
                                        value={selectValue}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </label>
                                <input type="submit" />
                            </div>
                        </form>
                    </div>
                )}
            </section>
        </main>
    );
};
