import ShoppingCartService from "../../services/ShoppingCartService";
import { useEffect, useState } from "react";
import { createImage } from "../../utils/operations";
import { cardInitialState } from "../../constants/initialStates";

import { Trash } from "phosphor-react";
import { Link } from "react-router-dom";
import { ImageBox } from "../Misc/ImageBox";

import styles from "./ShoppingCartCard.module.css";

//rename to ShoppingCartCard
export const ProductCardSmall = ({
    userToken,
    instanceID,
    user,
    updateCart,
}: {
    instanceID: string;
    userToken: string;
    user: IUserSession;
    updateCart: Function;
}) => {
    let [instanceData, setInstanceData] = useState(cardInitialState);
    let [loading, toggleLoading] = useState(true);

    useEffect(() => {
        ShoppingCartService.getSingleInstance(instanceID, userToken)
            .then(setInstanceData)
            .then(() => {
                toggleLoading(false);
            });
    }, [instanceID, userToken]);

    async function removeItem() {
        await ShoppingCartService.deleteCartInstance(
            instanceID,
            user.token
        ).then(() => {
            updateCart();
        });
    }

    return (
        <div className={styles["container__item"]}>
            <Link to={`/product/${instanceData.product._id}`}>
                <div className={styles["container__picture"]}>
                    <ImageBox
                        isLoading={loading}
                        imgSrc={createImage(
                            instanceData.productImage.data.data
                        )}
                    />
                </div>
            </Link>
            <div className={styles["container__details"]}>
                <div className={styles["details__main"]}>
                    <p>{instanceData.product.name}</p>
                    <div  className={styles["details__pricing"]}>
                        <strong>{`R$ ${
                            instanceData.quantity * instanceData.price
                        } `}</strong>
                        <p>{`UNIDS: ${instanceData.quantity} x ${instanceData.price} `}</p>
                    </div>
                </div>
                <div className={styles["container__footer"]}>
                    <p>{`Vendendor: ${instanceData.seller.name.first} ${instanceData.seller.name.last}`}</p>
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
