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
                        <strong>{`${user.saldo} R$`}</strong>
                    </div>
                    <div className={styles["checkout__info"]}>
                        <Info size={30} color="var(--main-color)" />
                        <p>{`Você esta comprando ${items.length} items`}</p>
                    </div>
                </div>
                {getTotalValue() > user.saldo && (
                    <div className={styles["checkout__warning"]}>
                        <Warning size={30} />
                        <strong>
                            Você nao tem saldo o suficiente para finalizar a
                            compra. Adicione mais{" "}
                            <Link to="add-funds">aqui.</Link>
                        </strong>
                    </div>
                )}
                <div className={styles["checkout__footer"]}>
                    <div>
                        <p>FORMA DE PAGAMENTO: BOLETO</p>
                    </div>
                    <div>
                        <button>FINALIZAR COMPRA</button>
                    </div>
                </div>
            </section>
        </main>
    );
};
