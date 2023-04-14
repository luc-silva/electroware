import styles from "./CardInfo.module.css";

export const CardInfo = ({
    product,
    isLoading,
}: {
    product: Product;
    isLoading: boolean;
}) => {
    return (
        <div className={styles["card-info"]}>
            <div className={styles["card-info-price"]}>
                {(isLoading && <div className={styles["loading-line"]} />) || (
                    <strong>{`R$ ${product.price}`}</strong>
                )}
            </div>
            <div className={styles["card-details"]}>
                {(isLoading && <div className={styles["loading-block"]} />) || (
                    <p>{product.name}</p>
                )}
            </div>
        </div>
    );
};
