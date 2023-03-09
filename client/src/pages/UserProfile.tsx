import { Star } from "phosphor-react";
import { StarsContainer } from "../components/StarsContainer";
import styles from "./UserProfile.module.css"

export const UserProfile = () => {
    return (
        <main role={"main"} className={styles["user-profile"]} >
            <aside className={styles["user-profile__info"]}>
                <div className={styles["user-profile__picture"]}>
                    <img src="" alt="" />
                </div>
                <div className={styles["user-profile__about"]}>

                </div>
            </aside>
            <div className={styles["user-profile__main"]}>
                <section className={styles["user-profile__details"]} >
                    <div className={styles["user-profile__details__title"]}>
                        <h2>Gabe Newelll</h2>
                        <p>Sao Paulo, Santos</p>
                    </div>
                    <div className={styles["user-profile__details__reputation"]}>
                        <p>Reputacao</p>
                        <div>
                            <strong>4.5</strong>
                            <div className={styles["user-profile__details__reputation"]}>
                                <StarsContainer size={20} stars={4.6} />
                            </div>
                        </div>
                    </div>
                    <div className={styles["user-description"]}>
                        <div className={styles["description-title"]}>
                            <p>Descricao</p>
                        </div>
                        <div className={styles["description-text"]}>

                        </div>
                    </div>
                </section>
                <section className={styles["user-profile__products"]}>
                    <div className={styles["user-profile__products__title"]}>
                        <h2>Produtos a venda</h2>
                    </div>
                    <div className={styles["user-profile__products__container"]}>
                        <div>
                
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};
