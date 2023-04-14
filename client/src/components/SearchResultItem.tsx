import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productInitialState } from "../constants/initialStates";
import ProductService from "../services/ProductService";
import UserService from "../services/UserService";
import { createImage } from "../utils/operations";
import { ImageBox } from "./Misc/ImageBox";
import styles from "./SearchResultItem.module.css";

export const SearchResultItem = ({ productId }: { productId: string }) => {
    let [status, setStatus] = useState(true);
    let [seller, setSeller] = useState({ first: "", last: "" });
    let [productData, setProductData] = useState(productInitialState);

    useEffect(() => {
        ProductService.getProductDetails(productId)
            .then((data) => {
                setProductData(data);
            })
            .then(() => {
                setStatus(false);
            });
    }, []);
    useEffect(() => {
        UserService.getUserInfo(productData.product.owner).then(({ name }) => {
            console.log({ name });
            setSeller(name);
        });
    }, [productData.product._id]);

    return (
        <div className={styles["result-product"]}>
            <Link to={`/product/${productData.product._id}`}>
                <div className={styles["product-image"]}>
                    <ImageBox
                        isLoading={status}
                        imgSrc={createImage(productData.image.data)}
                    />
                </div>
                <div className={styles["product-details"]}>
                    <div className={styles["product-details__main"]}>
                        <h3>{productData.product.name}</h3>
                        <p>Vendido por {`${seller.first} ${seller.last}`}</p>
                    </div>
                    <div className={styles["product-details__info"]}>
                        <strong>{`R$ ${productData.product.price}`}</strong>
                    </div>
                </div>
            </Link>
        </div>
    );
};
