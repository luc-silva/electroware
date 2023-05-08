import { format } from "date-fns";
import styles from "./TransactionCard.module.css";

export const TransactionCard = ({
    transaction,
}: {
    transaction: ITransaction;
}) => {
    return (
        <div className={styles["container__item"]}>
            <div className={styles["item__main"]}>
                <div className={styles["item__date"]}>
                    <p>
                        {format(new Date(transaction.createdAt), "dd/MM/yyyy")}
                    </p>
                </div>
                <div className={styles["item__payment-method"]}>
                    <p>FORMA DE PAGAMENTO:</p>
                    <p>{transaction.paymentMethod}</p>
                </div>
            </div>
            <div className={styles["item__details"]}>
                <p>
                    {transaction.products.length === 1
                        ? `${1} PRODUTO`
                        : `${transaction.products.length} PRODUTOS`}
                </p>
                {<em>{`(Total: R$ ${transaction.totalPrice})`}</em>}
            </div>
        </div>
    );
};
