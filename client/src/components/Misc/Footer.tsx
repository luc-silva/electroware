import { Link } from "react-router-dom";

import styles from "./Footer.module.css";
import { WebsiteLogo } from "./WebsiteLogo";

export const Footer = () => {
    return (
        <footer className={styles["footer"]}>
            <div className={styles["footer__main"]}>
                <nav className={styles["footer__navigation"]}>
                    <ul className={styles["footer__navigation__menu"]}>
                        <li>
                            <Link
                                to="https://github.com/luc-silva/electroware"
                                target={"_blank"}
                            >
                                Código Fonte
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="https://github.com/luc-silva"
                                target={"_blank"}
                            >
                                Github
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="https://www.linkedin.com/in/silva-luc/"
                                target={"_blank"}
                            >
                                LinkedIn
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className={styles["footer__details"]}>
                    <div>
                        <p>Criado por Lucas da Silva Santos.</p>
                        <p>
                            Tecnologias utilizadas: Typescript, ReactJS, Express
                            e MongoDB.
                        </p>
                    </div>
                    <div>
                        <p>
                            Ícones por{" "}
                            <a
                                href="https://phosphoricons.com/"
                                target={"_blank"}
                            >
                                Phosphor.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles["footer__logo"]}>
                <WebsiteLogo />
            </div>
        </footer>
    );
};
