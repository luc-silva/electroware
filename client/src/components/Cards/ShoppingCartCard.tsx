import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import ShoppingCartService from "../../services/ShoppingCartService";
import UserService from "../../services/UserService";

import { Trash } from "phosphor-react";
import { Link } from "react-router-dom";
import { ImageBox } from "../Misc/ImageBox";

import styles from "./ShoppingCartCard.module.css";

//rename to ShoppingCartCard
export const ProductCardSmall = ({
    userToken,
    instanceID,
}: {
    instanceID: string;
    userToken: string;
}) => {
    let cardInitialState = {
        id: "",
        product: "",
        price: 0,
        quantity: 0,
    };
    let productInitialState = {
        id: "",
        category: "",
        name: "",
        owner: "",
    };

    let [instanceData, setInstanceData] = useState(cardInitialState);
    let [product, setProduct] = useState(productInitialState);
    let [productSeller, setSeller] = useState({ first: "", last: "" });
    let [loading, toggleLoading] = useState(true);

    useEffect(() => {
        ShoppingCartService.getSingleInstance(instanceID, userToken).then(
            setInstanceData
        );
        ProductService.getProductDetails(instanceData.product)
            .then(setProduct)
            .then(() => {
                toggleLoading(false);
            });
        UserService.getUserInfo(product.owner).then((data) => {
            setSeller(data.name);
        });
    }, []);

    async function removeItem() {
        await ShoppingCartService.deleteCartInstance(instanceID, userToken);
    }

    return (
        <div className={styles["container__item"]}>
            <Link to={`/product/${product.id}`}>
                <div className={styles["container__picture"]}>
                    <ImageBox isLoading={loading} />
                </div>
            </Link>
            <div className={styles["container__details"]}>
                <div>
                    <p>{product.name}</p>
                    <div className={styles["container__pricing"]}>
                        <strong>{`R$ ${
                            instanceData.quantity * instanceData.price
                        } `}</strong>
                        <p>{`UNIDS: ${instanceData.quantity} x ${instanceData.price} `}</p>
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
