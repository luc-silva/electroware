//important dependencies
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAverage } from "../utils/operations";

//other components
import { StarsContainer } from "../components/StarsContainer";
import { ReviewsContainer } from "../components/ReviewsContainer";
import { ReviewForm } from "../components/Forms/ReviewForm";

//styles
import styles from "./Product.module.css";
import { ProductAbout } from "../components/Sections/ProductAbout";
import ProductService from "../services/ProductService";

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

    useEffect(() => {
        if (id) {
            ProductService.getProductDetails(id).then((resp: any) => {
                setProductDetails(resp);
            });
        }

        updateReviews();
    }, [id]);

    async function updateReviews() {
        await ProductService.getProductReviews(productDetails._id).then(
            (response) => {
                setProductReviews(response);
            }
        );
    }
    return (
        <main className={styles["product"]}>
            <ProductAbout user={user} productDetails={productDetails} />
            <section className={styles["product__ratings"]}>
                <div className={styles["ratings-main"]}>
                    <div className={styles["ratings__title"]}>
                        <h2>Avaliações do produto</h2>
                    </div>
                    <div className={styles["ratings__score"]}>
                        <strong>{getAverage(productReviews)}/5</strong>
                        <div>
                            <StarsContainer
                                size={30}
                                stars={getAverage(productReviews)}
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
