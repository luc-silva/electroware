import { UserProductCard } from "../Cards/UserProductCard";
import styles from "./UserProducts.module.css";

export const UserProducts = ({ products }: { products: Product[] }) => {
    return (
        <section className={styles["user-profile__products"]}>
            <div className={styles["user-profile__products__title"]}>
                <h2>Produtos a venda</h2>
            </div>
            <div className={styles["user-profile__products__container"]}>
                {products.map(({ _id }: { _id: string }, index: React.Key) => (
                    <UserProductCard id={_id} key={index} />
                ))}
            </div>
        </section>
    );
};
