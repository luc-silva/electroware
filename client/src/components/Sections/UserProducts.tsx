import { Link } from "react-router-dom";
import { UserProductCard } from "../Cards/UserProductCard";
import styles from "./UserProducts.module.css";

export const UserProducts = ({ products }: { products: Product[] }) => {
    return (
        <section className={styles["user-profile__products"]}>
            <div className={styles["user-profile__products__title"]}>
                <h2>Produtos a venda</h2>
            </div>
            <div className={styles["user-profile__products__container"]}>
                {products.map(({_id}) => <UserProductCard id={_id}/> )}
            </div>
        </section>
    );
};
