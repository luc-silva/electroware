import styles from "./CardInfo.module.css";

export const CardInfo = ({
    data,
    isLoading,
}: {
    data: any;
    isLoading: boolean;
}) => {
    return (
        <div className={styles["card-info"]}>
            <div className={styles["card-info-price"]}>
                {(isLoading && <div className={styles["loading-line"]} />) || (
                    <strong>{`R$ ${data.price}`}</strong>
                )}
            </div>
            <div className={styles["card-details"]}>
                {(isLoading && <div className={styles["loading-block"]} />) || (
                    <p>{data.name}</p>
                )}
            </div>
        </div>
    );
};
