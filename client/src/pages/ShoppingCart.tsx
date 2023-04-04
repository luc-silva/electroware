import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCardSmall } from "../components/Cards/ProductCardSmall";
import ShoppingCartService from "../services/ShoppingCartService";
import { getTotalValue } from "../utils/operations";
import styles from "./ShoppingCart.module.css";

export const ShoppingCart = ({
    user,
    setUser,
}: {
    user: UserProps;
    setUser: Function;
}) => {
    let navigate = useNavigate();
    let [items, setItems] = useState([]);
    
    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }
        ShoppingCartService.getShoppingcart(user.token).then((data) => {
            setItems(data);
        });
    });

    function handleCheckout() {
        navigate("/checkout");
    }
    return (
        <main role={"main"} className={styles["shopping-cart"]}>
            <section className={styles["shopping-cart__main"]}>
                <div className={styles["shopping-cart__main__title"]}>
                    <h2>Carrinho de Compras</h2>
                </div>
                <div className={styles["shopping-cart__container"]}>
                    {items.map(({ product, price, quantity, _id }, index) => {
                        return (
                            <ProductCardSmall
                                userToken={user.token}
                                instanceID={_id}
                                productID={product}
                                productPrice={price}
                                productQNT={quantity}
                                key={index}
                            />
                        );
                    })}
                </div>
            </section>
            <aside className={styles["shopping-cart__panel"]}>
                <div className={styles["shopping-cart__panel__display"]}>
                    <p>Valor total:</p>
                    <strong>{`${getTotalValue(items)} R$`}</strong>
                </div>
                {(getTotalValue(items) > 0 && (
                    <button onClick={handleCheckout}>Finalizar Compra</button>
                )) || <button disabled>Finalizar Compra</button>}
            </aside>
        </main>
    );
};
