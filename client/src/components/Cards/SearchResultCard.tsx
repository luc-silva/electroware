import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productInitialState } from "../../constants/initialStates";
import ProductService from "../../services/ProductService";
import UserService from "../../services/UserService";
import { createImage } from "../../utils/operations";
import { ImageBox } from "../Misc/ImageBox";

import styles from "./SearchResultCard.module.css";

export const SearchResultItem = ({ productId }: { productId: string }) => {
    let [isLoading, toggleLoading] = useState(true);
    let [seller, setSeller] = useState({ first: "", last: "" });
    let [productData, setProductData] = useState(productInitialState);

    useEffect(() => {
        if (productId) {
            ProductService.getProductDetails(productId)
                .then((data) => {
                    setProductData(data);
                })
                .then(() => {
                    toggleLoading(false);
                });
        }
    }, []);
    useEffect(() => {
        if (productData.product._id) {
            UserService.getUserInfo(productData.product.owner).then(
                ({ name }) => {
                    setSeller(name);
                }
            );
        }
    }, [productData.product._id]);

    return (
        <div className={styles["product-card"]}>
            <Link to={`/product/${productData.product._id}`}>
                <div className={styles["product-image"]}>
                    <ImageBox
                        isLoading={isLoading}
                        imgSrc={createImage(productData.image.data)}
                    />
                </div>
                <div className={styles["product-details"]}>
                    <div className={styles["product-details__main"]}>
                        {(isLoading && (
                            <div className={styles["loading-line"]} />
                        )) || <h3>{productData.product.name}</h3>}
                        <div className={styles["details__seller"]}>
                            {(isLoading && (
                                <div className={styles["loading-line"]} />
                            )) || (
                                <p>
                                    Vendido por{" "}
                                    {`${seller.first} ${seller.last}`}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className={styles["product-details__info"]}>
                        {(isLoading && (
                            <div className={styles["loading-line"]} />
                        )) || (
                            <strong>{`R$ ${productData.product.price}`}</strong>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};
