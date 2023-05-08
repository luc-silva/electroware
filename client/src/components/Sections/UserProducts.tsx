import { UserProductCard } from "../Cards/UserProductCard";
import { NothingAvailableDialog } from "../Misc/NothingAvailableDialog";
import styles from "./UserProducts.module.css";

export const UserProducts = ({ products }: { products: IProductDetails[] }) => {
    return (
        <section className={styles["user-profile__products"]}>
            <div className={styles["user-profile__products__title"]}>
                <h2>Produtos à venda</h2>
            </div>
            <div className={styles["user-profile__products__container"]}>
                {(products.length > 0 &&
                    products.map(
                        ({ _id }: { _id: string }, index: React.Key) => (
                            <UserProductCard id={_id} key={index} />
                        )
                    )) || (
                    <NothingAvailableDialog text="Esse usuário não possui itens à venda." />
                )}
            </div>
        </section>
    );
};
