import styles from "./ProductCardSmall.module.css";

export const ProductCardSmall = () => {
    return (
        <div className={styles["container__item"]}>
            <a href="">
                <div className={styles["container-picture"]}>
                    <img src="" alt="" />
                </div>
                <div className={styles["container-details"]}>
                    <div>
                        <p>PC GAMER</p>
                        <strong>4000 R$</strong>
                    </div>
                    <p>Vendendor: Gabe Newell</p>
                </div>
            </a>
        </div>
    );
};
