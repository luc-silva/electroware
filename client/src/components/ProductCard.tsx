import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

interface productCard {
    name: String;
    price: Number;
    id: String;
}

export const ProductCard = ({ name, price, id }: productCard) => {
    return (
        <li className={styles["card-wrapper"]}>
            <Link className={styles["card"]} to={`/product/${id}`}>
                <div className={styles["card-image"]}>
                    {/* <img src="" alt="" /> */}
                </div>
                <div className={styles["card-info"]}>
                    <div className={styles["card-info-price"]}>
                        <strong>{`R$ ${price}`}</strong>
                    </div>
                    <div className={styles["card-details"]}>
                        <p>{name}</p>
                    </div>
                </div>
            </Link>
        </li>
    );
};
