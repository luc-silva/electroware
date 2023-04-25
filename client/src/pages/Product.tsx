//important dependencies
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productPageInitialState } from "../constants/initialStates";

//other components
import { StarsContainer } from "../components/Misc/StarsContainer";
import { ReviewsContainer } from "../components/Misc/ReviewsContainer";

//styles
import styles from "./Product.module.css";
import { ProductAbout } from "../components/Sections/ProductAbout";
import ProductService from "../services/ProductService";

export const Product = ({
    user,
    showToast,
}: {
    user: UserProps;
    showToast: Function;
}) => {
    let { id } = useParams();
    const navigate = useNavigate();

    let [productDetails, setProductDetails] = useState(productPageInitialState);
    let [infoStatus, toggleInfoStatus] = useState(true);
    let [score, setScore] = useState(0);

    function updateProductScore() {
        ProductService.getProductScore(productDetails.product._id).then(
            (data: [{ id: string; averageScore: number }]) => {
                if (data.length > 0) {
                    let score = data[0].averageScore;
                    setScore(score);
                } else {
                    setScore(0);
                }
            }
        );
    }

    useEffect(() => {
        if (id) {
            ProductService.getProductDetails(id)
                .then((data: any) => {
                    toggleInfoStatus(false);
                    setProductDetails(data);
                })
                .catch(() => {
                    navigate("/not-found");
                });
        }
    }, [id]);
    useEffect(() => {
        if (productDetails.product._id) {
            updateProductScore();
        }
    }, [productDetails]);

    return (
        <main className={styles["product"]}>
            <ProductAbout
                user={user}
                productDetails={productDetails}
                status={infoStatus}
                showToast={showToast}
            />
            <section className={styles["product__ratings"]}>
                <div className={styles["ratings-main"]}>
                    <div className={styles["ratings__title"]}>
                        <h2>Avaliações do produto</h2>
                    </div>
                    <div className={styles["ratings__score"]}>
                        <strong>{score.toFixed(1)}/5</strong>
                        <div>
                            <StarsContainer size={30} stars={score} />
                        </div>
                    </div>
                </div>
                <ReviewsContainer
                    user={user}
                    product={productDetails.product}
                    updateScore={updateProductScore}
                />
            </section>
        </main>
    );
};
