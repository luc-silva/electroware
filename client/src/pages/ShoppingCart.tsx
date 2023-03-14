import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { ProductCardSmall } from "../components/ProductCardSmall";
import styles from "./ShoppingCart.module.css";

interface ShoppingCartCardProps {
    id: string;
    owner: string;
    product: string;
    shoppingCart: string;
    price: number;
    quantity: number;
}

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
        axios
            .get(`http://localhost:6060/api/shoppingcart`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then(({ data }) => {
                setItems(data);
            });
    });
    function getTotalValue() {
        let total = 0;
        items.forEach(({ price, quantity }: ShoppingCartCardProps) => {
            total += price * quantity;
        });
        return total;
    }
    return (
        <main role={"main"} className={styles["shopping-cart"]}>
            <section className={styles["shopping-cart__main"]}>
                <div className={styles["shopping-cart__main__title"]}>
                    <h2>Carrinho de Compras</h2>
                </div>
                <div className={styles["shopping-cart__container"]}>
                    {items.map(({ product, price, quantity }, index) => {
                        return (
                            <ProductCardSmall
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
                    <strong>{`${getTotalValue()} R$`}</strong>
                </div>
                <button>Finalizar Compra</button>
            </aside>
        </main>
    );
};
