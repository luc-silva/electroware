import { calculateDiscountedValue } from "../../utils/operations";
import styles from "./CardPriceDisplay.module.css";

export const CardPriceDisplay = ({
    price,
    discount,
    on_sale,
}: {
    price: number;
    discount: number;
    on_sale: boolean;
}) => {
    return (
        (!on_sale && (
            <strong className={styles["price"]}>{`R$ ${price}`}</strong>
        )) || (
            <>
                <strong
                    className={styles["price"]}
                >{`R$ ${calculateDiscountedValue(
                    price,
                    discount
                )}`}</strong>{" "}
                <em className={styles["full-price"]}>{`de R$ ${price}`}</em>
            </>
        )
    );
};
