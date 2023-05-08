import ShoppingCartService from "../services/ShoppingCartService";
import { getTotalValue } from "../utils/operations";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProductCardSmall } from "../components/Cards/ShoppingCartCard";
import styles from "./ShoppingCart.module.css";

export const ShoppingCart = ({
    user,
    setUser,
}: {
    user: IUserSession;
    setUser: Function;
}) => {
    let navigate = useNavigate();
    let [items, setItems] = useState([]);

    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }
        updateCart();
    }, []);

    function handleCheckout() {
        navigate("/checkout");
    }
    async function updateCart() {
        ShoppingCartService.getCartInstances(user.token).then((data) => {
            setItems(data);
        });
    }

    return (
        <main role={"main"} className={styles["shopping-cart"]}>
            <section className={styles["shopping-cart__main"]}>
                <div className={styles["shopping-cart__main__title"]}>
                    <h2>Carrinho de Compras</h2>
                </div>
                {(items.length === 0 && <p>Carrinho de compras vazio.</p>) || (
                    <div className={styles["shopping-cart__container"]}>
                        {items.map(
                            ({ _id }: ICartItem, index: any) => {
                                return (
                                    <ProductCardSmall
                                        updateCart={updateCart}
                                        instanceID={_id}
                                        userToken={user.token}
                                        user={user}
                                        key={index}
                                    />
                                );
                            }
                        )}
                    </div>
                )}
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
