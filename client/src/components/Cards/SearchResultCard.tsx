import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { Link } from "react-router-dom";

import { productInitialState } from "../../constants/initialStates";
import { createImage } from "../../utils/operations";
import { ImageBox } from "../Misc/ImageBox";

import { CardPriceDisplay } from "../Displays/CardPriceDisplay";
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
    }, [productId]);
    useEffect(() => {
        if (productData.product._id) {
            UserService.getUserInfo(productData.product.owner).then(
                ({ name }) => {
                    setSeller(name);
                }
            );
        }
    }, [productData.product._id, productData.product.owner]);

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
                            <CardPriceDisplay
                                discount={productData.product.discount}
                                on_sale={productData.product.on_sale}
                                price={productData.product.price}
                            />
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};
