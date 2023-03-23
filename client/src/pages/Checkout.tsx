import styles from "./Checkout.module.css";
import axios from "axios";
import { Info, Warning } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Checkout = ({
    user,
    setUser,
}: {
    user: UserProps;
    setUser: Function;
}) => {
    let [items, setItems] = useState([]);
    const navigate = useNavigate();
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
    }, [user]);

    function getTotalValue() {
        let total = 0;
        items.forEach(({ price, quantity }: ShoppingCartCardProps) => {
            total += price * quantity;
        });
        return total;
    }
    function handleCheckout() {
        axios
            .get(`http://localhost:6060/api/transaction`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then(() => {
                navigate("/config#transactions");
            });
    }
    return (
        <main className={styles["checkout"]}>
            <section className={styles["checkout__main"]}>
                <div className={styles["checkout__main__values"]}>
                    <div className={styles["checkout__total-value"]}>
                        <p>Valor Total:</p>
                        <strong>{`${getTotalValue()} R$`}</strong>
                    </div>
                    <div className={styles["checkout__credit-value"]}>
                        <p>Seu Saldo:</p>
                        <strong>{`${user.funds} R$`}</strong>
                    </div>
                    <div className={styles["checkout__info"]}>
                        <Info size={30} color="var(--main-color)" />
                        <p>
                            {items.length === 1
                                ? `Você está comprando ${items.length} item.`
                                : `Você está comprando ${items.length} itens.`}
                        </p>
                    </div>
                </div>
                {getTotalValue() > user.funds && (
                    <div className={styles["checkout__warning"]}>
                        <div>
                            <Warning size={30} />
                            <strong>
                                Você não tem saldo o suficiente para finalizar a
                                compra.
                            </strong>
                        </div>
                        <Link to="/add-funds">Adicionar mais</Link>
                    </div>
                )}
                <div className={styles["checkout__footer"]}>
                    <div className={styles["payment-method__display"]}>
                        <p>FORMA DE PAGAMENTO:</p>
                        <select name="paymentMethod">
                            <option value="Boleto">Boleto</option>
                            <option value="Cartão de Crédito">
                                Cartão de Crédito
                            </option>
                            <option value="Bitcoin">Bitcoin</option>
                            <option value="Pix">Pix</option>
                        </select>
                    </div>
                    <div>
                        {(getTotalValue() > user.funds && (
                            <button onClick={handleCheckout} disabled>
                                FINALIZAR COMPRA
                            </button>
                        )) || (
                            <button onClick={handleCheckout}>
                                FINALIZAR COMPRA
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};
