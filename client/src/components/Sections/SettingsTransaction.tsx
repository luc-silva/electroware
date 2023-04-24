import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { TransactionCard } from "../Cards/TransactionCard";
import styles from "./SettingsTransaction.module.css";

export const SettingsTransaction = ({ user }: { user: UserProps }) => {
    let [userTransactions, setUserTransactions] = useState([]);
    useEffect(() => {
        UserService.getUserTransactions(user.id, user.token).then((data) => {
            setUserTransactions(data);
        });
    }, []);
    return (
        <section className={styles["transactions"]} id="transactions">
            <div className={styles["transactions__title"]}>
                <h3>Compras Realizadas</h3>
            </div>
            <div className={styles["transactions__container"]}>
                {(userTransactions.length === 0 && (
                    <p>Nenhuma compra realizada</p>
                )) ||
                    userTransactions.map(
                        (transaction: Transaction, index: React.Key) => {
                            return (
                                <TransactionCard
                                    transaction={transaction}
                                    key={index}
                                />
                            );
                        }
                    )}
            </div>
        </section>
    );
};
