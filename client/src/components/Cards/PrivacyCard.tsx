import { Link } from "react-router-dom";
import styles from "./PrivacyCard.module.css";

export const PrivacyCard = () => {
    return (
        <div className={styles["privacy-card"]}>
            <div className={styles["privacy-card__title"]}>
                <h3>Políticas de Privacidade</h3>
            </div>
            <div className={styles["privacy-card__main"]}>
                <p>
                    Veja as políticas de privacidade{" "}
                    <Link to="/privacy" target="_self">
                        aqui.
                    </Link>
                </p>
            </div>
        </div>
    );
};
