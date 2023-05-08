import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductService from "../../services/ProductService";

import { productInitialState } from "../../constants/initialStates";
import { createImage } from "../../utils/operations";
import { ImageBox } from "../Misc/ImageBox";
import { CardPriceDisplay } from "../Displays/CardPriceDisplay";

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
                    <div className={styles["product__name"]}>
                        {(isLoading && (
                            <div className={styles["loading-line"]} />
                        )) || <p>{productDetails.product.name}</p>}
                    </div>
                    <div className={styles["product__price"]}>
                        {(isLoading && (
                            <div className={styles["loading-line"]} />
                        )) || (
                            <CardPriceDisplay
                                discount={productDetails.product.discount}
                                on_sale={productDetails.product.on_sale}
                                price={productDetails.product.price}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};
