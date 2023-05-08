import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { TransactionCard } from "../Cards/TransactionCard";
import styles from "./SettingsTransaction.module.css";
import { NothingAvailableDialog } from "../Misc/NothingAvailableDialog";

export const SettingsTransaction = ({ user }: { user: IUserSession }) => {
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
            {(userTransactions.length > 0 && (
                <div className={styles["transactions__container"]}>
                    {userTransactions.map(
                        (transaction: ITransaction, index: React.Key) => {
                            return (
                                <TransactionCard
                                    transaction={transaction}
                                    key={index}
                                />
                            );
                        }
                    )}
                </div>
            )) || <NothingAvailableDialog text="Nenhuma compra realizada." />}
        </section>
    );
};
