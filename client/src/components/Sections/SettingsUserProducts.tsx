import { useEffect, useState } from "react";
import UserService from "../../services/UserService";

import { SettingsProductCard } from "../Cards/SettingsProductCard";
import styles from "./SettingsUserProducts.module.css";

export const SettingsUserProducts = ({ user, showToast }: { user: UserProps, showToast:Function }) => {
    let [products, setProducts] = useState([]);
    async function updateProducts() {
        await UserService.getUserProducts(user.id).then(setProducts);
    }

    useEffect(() => {
        if (user.id) {
            updateProducts();
        }
    }, []);
    return (
        <section className={styles["settings-products"]}>
            <div className={styles["settings-products__title"]}>
                <h2>Seus Produtos</h2>
            </div>
            <div className={styles["settings-products__container"]}>
                {products.map(({ _id }: { _id: string }) => (
                    <SettingsProductCard
                        id={_id}
                        user={user}
                        showToast={showToast}
                        update={updateProducts}
                    />
                ))}
            </div>
        </section>
    );
};
