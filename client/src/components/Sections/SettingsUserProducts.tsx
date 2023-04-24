import { useEffect, useState } from "react";
import UserService from "../../services/UserService";

import styles from "./SettingsUserProducts.module.css";
import { SettingsProductCard } from "../Cards/SettingsProductCard";

export const SettingsUserProducts = ({ user }: { user: UserProps }) => {
    let [products, setProducts] = useState([]);

    useEffect(() => {
        if (user.id) {
            UserService.getUserProducts(user.id).then(setProducts);
        }
    }, []);
    return (
        <section className={styles["settings-products"]}>
            <div className={styles["settings-products__title"]}>
                <h2>Seus Produtos</h2>
            </div>
            <div className={styles["settings-products__container"]}>
                {products.map(({ _id }: { _id: string }) => (
                    <SettingsProductCard id={_id} user={user} />
                ))}
            </div>
        </section>
    );
};
