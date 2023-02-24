import styles from "./ProductCard.module.css";

interface productCard {
    productName: string;
    productPrice: string;
    productUrl: string;
    productVendor: string;
}

export const ProductCard = ({
    productName,
    productPrice,
    productUrl,
    productVendor
}: productCard) => {
    return (
        <li className={styles["card-wrapper"]}>
            <a className={styles["card"]} href={productUrl}>
                <div className={styles["card-image"]}>
                    {/* <img src="" alt="" /> */}
                </div>
                <div className={styles["card-info"]}>
                    <div className={styles["card-details"]}>
                        <strong>{productName}</strong>
                        <div className={styles["details-vendor"]}>
                            Being sold by:
                            <p>{productVendor}</p>
                        </div>
                    </div>
                    <div className={styles["card-info-price"]}>
                        <p>{productPrice}</p>
                    </div>
                </div>
            </a>
        </li>
    );
};
