import styles from "./Checkout.module.css"
import axios from "axios"

export const Checkout = () => {
    // function handleCheckout(){
    //     axios.
    // }

    return (
        <main className={styles["checkout"]}>
            <article className={styles["checkout__main"]}>
                <div className={styles["checkout__total-value"]}>
                    <p>Valor Total:</p>
                    <strong>40.00 R$</strong>
                </div>
                <div className={styles["checkout__footer"]}>
                    <div>
                        <p>FORMA DE PAGAMENTO: BOLETO</p>
                    </div>
                    <div>
                        <button >FINALIZAR COMPRA</button>
                    </div>
                </div>
            </article>
        </main>
    )
}