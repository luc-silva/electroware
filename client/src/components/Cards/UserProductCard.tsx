import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productInitialState } from "../../constants/initialStates";
import ProductService from "../../services/ProductService";
import { createImage } from "../../utils/operations";
import { ImageBox } from "../Misc/ImageBox";
import styles from "./UserProductCard.module.css";

export const UserProductCard = ({ id }: { id: string }) => {
    let [productDetails, setProductDetails] = useState(productInitialState);
    let [isLoading, toggleLoading] = useState(true);
    useEffect(() => {
        if (id) {
            ProductService.getProductDetails(id)
                .then(setProductDetails)
                .then(() => {
                    toggleLoading(false);
                });
        }
    }, [id]);

    return (
        <Link to={`/product/${id}`}>
            <div className={styles["user-profile__product__item"]}>
                <div className={styles["product__picture"]}>
                    <ImageBox
                        isLoading={isLoading}
                        imgSrc={createImage(productDetails.image.data)}
                    />
                </div>
                <div className={styles["product__main"]}>
                    <p>{productDetails.product.name}</p>
                    <strong>{`${productDetails.product.price} R$`}</strong>
                </div>
            </div>
        </Link>
    );
};
