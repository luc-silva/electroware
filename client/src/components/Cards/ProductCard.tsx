import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductService from "../../services/ProductService";
import styles from "./ProductCard.module.css";

export const ProductCard = ({ id }: { id: string }) => {
    let productCardInitialState = {
        price: 0,
        name: "",
    };

    let [productData, setProductData] = useState(productCardInitialState);
    let [cardStatus, setCardStatus] = useState({ loading: true, error: false });
    useEffect(() => {
        ProductService.getProductDetails(id)
            .then((data) => {
                setProductData(data);
            })
            .then(() => {
                setCardStatus({ loading: false, error: false });
            })
            .catch(() => {
                setCardStatus({ loading: false, error: true });
            });
    }, []);

    return (
        <Link className={styles["card-wrapper"]} to={`/product/${id}`}>
            <div className={styles["card-image"]}>
                {/* <img src="" alt="" /> */}
            </div>
            <div className={styles["card-info"]}>
                <div className={styles["card-info-price"]}>
                    <strong>{`R$ ${productData.price}`}</strong>
                </div>
                <div className={styles["card-details"]}>
                    <p>{productData.name}</p>
                </div>
            </div>
        </Link>
    );
};
