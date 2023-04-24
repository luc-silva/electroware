import { UserProductCard } from "./UserProductCard";

import { NotePencil, Trash } from "phosphor-react";
import styles from "./SettingsProductCard.module.css";
import ProductService from "../../services/ProductService";
import { useNavigate } from "react-router-dom";

export const SettingsProductCard = ({
    id,
    user,
}: {
    id: string;
    user: UserProps;
}) => {
    const navigate = useNavigate()

    async function deleteProduct() {
        await ProductService.removeProduct(id, user.token);
    }
    function editProduct() {
        navigate(`${id}`)
    }

    return (
        <div className={styles["settings-product"]}>
            <div className={styles["settings-product__card"]}>
                <UserProductCard id={id} />
            </div>
            <div className={styles["settings-product__buttons"]}>
                <button className={styles["edit-btn"]}>
                    <NotePencil size={30} onClick={editProduct} />
                </button>
                <button className={styles["close-btn"]}>
                    <Trash size={30} onClick={deleteProduct} />
                </button>
            </div>
        </div>
    );
};
