import { PolicyText } from "../components/Misc/PolicyText";
import styles from "./PrivacyPolicy.module.css";
import { UserCommitment } from "../components/Misc/UserCommitment";

export const PrivacyPolicy = () => {
    return (
        <main className={styles["privacy"]}>
            <section className={styles["privacy__main"]}>
                <div className={styles["privacy__title"]}>
                    <h2>Política Privacidade</h2>
                </div>
                <div className={styles["privacy__text"]}>
                    <PolicyText />
                </div>
            </section>
            <section className={styles["privacy__user-commitment"]}>
                <div className={styles["privacy__user-commitment__title"]}>
                    <h3>Compromisso do Usuário</h3>
                </div>
                <div className={styles["privacy__user-commitment__text"]}>
                    <UserCommitment />
                </div>
            </section>
            <section className={styles["privacy__misc"]}>
                <div className={styles["privacy__misc__title"]}>
                    <h3>Mais informações</h3>
                </div>
                <div className={styles["privacy__misc__text"]}>
                    <p>
                        Esperemos que esteja esclarecido e, como mencionado
                        anteriormente, se houver algo que você não tem certeza
                        se precisa ou não, geralmente é mais seguro deixar os
                        cookies ativados, caso interaja com um dos recursos que
                        você usa em nosso site.
                    </p>
                    <p>
                        Esta política é efetiva a partir de 24 de Abril de 2023, às 23:35.
                    </p>
                </div>
                <div className={styles["privacy__misc__extra"]}>
                    <strong>** Política de privacidade fictícia. **</strong>
                    {" "}Gerado por{" "}
                    <a href="http://politicaprivacidade" target="_blank">
                        PolíticaPrivacidade.
                    </a>
                </div>
            </section>
        </main>
    );
};
