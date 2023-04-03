import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

export const ProductCard = ({ id }: { id: string }) => {
    let productCardInitialState = {
        price: 0,
        name: "",
    };

    let [productData, setProductData] = useState(productCardInitialState);
    let [cardStatus, setCardStatus] = useState({ loading: true, error: false });
    useEffect(() => {
        axios
            .get(`http://localhost:6060/api/product/${id}`)
            .then(({ data }: AxiosResponse) => {
                setProductData(data);
            }).then(() => {
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
