import axios from "axios";
import { Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCardSmall.module.css";

export const ProductCardSmall = ({
    userToken,
    instanceID,
    productID,
    productPrice,
    productQNT,
}: {
    userToken: String;
    instanceID: string;
    productID: string;
    productPrice: number;
    productQNT: number;
}) => {
    let [product, setProduct] = useState({ category: "", name: "", owner: "" });
    let [productSeller, setSeller] = useState({ first: "", last: "" });
    useEffect(() => {
        axios
            .get(`http://localhost:6060/api/product/${productID}`)
            .then(({ data }) => setProduct(data));
    }, [productID]);
    useEffect(() => {
        axios
            .get(`http://localhost:6060/api/user/${product.owner}`)
            .then(({ data }) => {
                setSeller(data.name);
            });
    }, [product]);

    function removeItem() {
        axios.delete(`http://localhost:6060/api/shoppingcart/${instanceID}`, {
            headers: { Authorization: `Bearer ${userToken}` },
        });
    }

    return (
        <div className={styles["container__item"]}>
            <Link to={`/product/${productID}`}>
                <div className={styles["container__picture"]}>
                    <img src="" alt="" />
                </div>
            </Link>
            <div className={styles["container__details"]}>
                <div>
                    <p>{product.name}</p>
                    <div className={styles["container__pricing"]}>
                        <strong>{`R$ ${productQNT * productPrice} `}</strong>
                        <p>{`UNIDS: ${productQNT} x ${productPrice} `}</p>
                    </div>
                </div>
                <div className={styles["container__footer"]}>
                    <p>{`Vendendor: ${productSeller.first} ${productSeller.last}`}</p>
                    <Trash
                        size={20}
                        color={`var(--text-color)`}
                        onClick={removeItem}
                    />
                </div>
            </div>
        </div>
    );
};
