import { Link } from "react-router-dom";
import styles from "./UserProducts.module.css";

export const UserProducts = ({ products }: { products: Product[] }) => {
    return (
        <section className={styles["user-profile__products"]}>
            <div className={styles["user-profile__products__title"]}>
                <h2>Produtos a venda</h2>
            </div>
            <div className={styles["user-profile__products__container"]}>
                {products.map(({ name, _id, price }) => {
                    return (
                        <Link to={`/product/${_id}`}>
                            <div
                                className={
                                    styles["user-profile__product__item"]
                                }
                            >
                                <div className={styles["product__picture"]}>
                                    <img src="" alt="" />
                                </div>
                                <div className={styles["product__main"]}>
                                    <p>{name}</p>
                                    <strong>{`${price} R$`}</strong>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};
