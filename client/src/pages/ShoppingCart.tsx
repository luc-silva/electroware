import { ProductCardSmall } from "../components/ProductCardSmall"
import styles from "./ShoppingCart.module.css"

export const ShoppingCart = () => {
    return (
        <main role={"main"} className={styles["shopping-cart"]}>
            <section className={styles["shopping-cart__main"]}>
                <div className={styles["shopping-cart__main__title"]}>
                    <h2>Carrinho de Compras</h2>
                </div>
                <div className={styles["shopping-cart__container"]}>
                   <ProductCardSmall />
                   <ProductCardSmall />
                   <ProductCardSmall />
                </div>
            </section>
            <aside className={styles["shopping-cart__panel"]}>
                <div className={styles["shopping-cart__panel__display"]}>
                    <p>Valor total:</p>
                    <strong>2141 R$</strong>
                </div>
                <button>Finalizar Compra</button>
            </aside>
        </main>
    )
}