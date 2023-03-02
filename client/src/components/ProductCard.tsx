import styles from "./ProductCard.module.css";

interface productCard {
    name: string;
    price: string;
}

export const ProductCard = ({
    name,
    price,
}: productCard) => {

    return (
        <li className={styles["card-wrapper"]}>
            <a className={styles["card"]} href={""}>
                <div className={styles["card-image"]}>
                    {/* <img src="" alt="" /> */}
                </div>
                <div className={styles["card-info"]}>
                    <div className={styles["card-details"]}>
                        <strong>{name}</strong>
                    </div>
                    <div className={styles["card-info-price"]}>
                        <p>{price}</p>
                    </div>
                </div>
            </a>
        </li>
    );
};
