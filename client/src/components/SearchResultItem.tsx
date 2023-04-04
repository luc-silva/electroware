import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";
import styles from "./SearchResultItem.module.css";

export const SearchResultItem = ({ product }: { product: Product }) => {
    let [seller, setSeller] = useState({ first: "", last: "" });
    useEffect(() => {
        UserService.getUserInfo(product.owner)
            .then((data) => {
                //type it later
                setSeller({ first: data.name.first, last: data.name.last });
            });
    }, []);
    return (
        <div className={styles["result-product"]}>
            <Link to={`/product/${product._id}`}>
                <div className={styles["product-image"]}>
                    <img src="a" alt="" />
                </div>
                <div className={styles["product-details"]}>
                    <div className={styles["product-details__main"]}>
                        <h3>{product.name}</h3>
                        <p>Vendido por {`${seller.first} ${seller.last}`}</p>
                    </div>
                    <div className={styles["product-details__info"]}>
                        <strong>{`R$ ${product.price}`}</strong>
                    </div>
                </div>
            </Link>
        </div>
    );
};
