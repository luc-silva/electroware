import { Warning } from "phosphor-react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export const NotFound = () => {
    return (
        <main role={"main"} className={styles["not-found"]}>
            <section className={styles["not-found__main"]}>
                <Warning
                    size={60}
                    color="var(--main-color)"
                    className={styles["main__icon"]}
                />
                <div className={styles["main__title"]}>
                    <h2>404</h2>
                    <p>Página não encontrada.</p>
                </div>
            </section>
            <section className={styles["not-found__footer"]}>
                <nav className={styles["footer__navigation"]}>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/Faq">FAQ</Link>
                        </li>
                        <li>
                            <Link to="/privacy">Política de Privacidade</Link>
                        </li>
                        <li>
                            <a
                                href="https://github.com/luc-silva/electroware"
                                target={"_blank"}
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/silva-luc/"
                                target={"_blank"}
                            >
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </nav>
            </section>
        </main>
    );
};
