import styles from "./ShoppingCart.module.css"

export const ShoppingCart = () => {
    return (
        <main role={"main"} className={styles["shopping-cart"]}>
            <section className={styles["shopping-cart__main"]}>
                <div className={styles["shopping-cart__main__title"]}>
                    <h2>Carrinho de Compras</h2>
                </div>
                <div className={styles["shopping-cart__container"]}>
                    <div className={styles["container__item"]}>
                        <div className={styles["container-picture"]}>
                            <img src="" alt="" />
                        </div>
                        <div className={styles["container-details"]}>
                            <div>
                                <p>PC GAMER</p>
                                <strong>4000 R$</strong>
                            </div>
                            <p>Vendendor: Gabe Newell</p>
                        </div>
                    </div>
                    <div className={styles["container__item"]}>
                        <div className={styles["container-picture"]}>
                            <img src="" alt="" />
                        </div>
                        <div className={styles["container-details"]}>
                            <div>
                                <p>PC GAMER</p>
                                <strong>4000 R$</strong>
                            </div>
                            <p>Vendendor: Gabe Newell</p>
                        </div>
                    </div>
                    <div className={styles["container__item"]}>
                        <div className={styles["container-picture"]}>
                            <img src="" alt="" />
                        </div>
                        <div className={styles["container-details"]}>
                            <div>
                                <p>PC GAMER</p>
                                <strong>4000 R$</strong>
                            </div>
                            <p>Vendendor: Gabe Newell</p>
                        </div>
                    </div>
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