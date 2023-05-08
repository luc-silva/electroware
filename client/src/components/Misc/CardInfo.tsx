import styles from "./CardInfo.module.css";
import { CardPriceDisplay } from "../Displays/CardPriceDisplay";

export const CardInfo = ({
    product,
    isLoading,
}: {
    product: IProductDetails;
    isLoading: boolean;
}) => {
    return (
        <div className={styles["card-info"]}>
            <div className={styles["card-info-price"]}>
                {(isLoading && <div className={styles["loading-line"]} />) || (
                    <CardPriceDisplay
                        price={product.price}
                        discount={product.discount}
                        on_sale={product.on_sale}
                    />
                )}
            </div>
            <div className={styles["card-details"]}>
                {(isLoading && <div className={styles["loading-line"]} />) || (
                    <p>{product.name}</p>
                )}
            </div>
        </div>
    );
};
