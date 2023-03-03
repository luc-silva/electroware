import { Link } from "react-router-dom";
import { MagnifyingGlass, ShoppingCart } from "phosphor-react";

import styles from "./Header.module.css";

export const Header = () => {
    let isLogged = true;

    return (
        <header className={styles["header"]}>
            <div className={styles["header__main"]}>
                <h1 className={styles["header-logo"]}>
                    <Link to={"/home"}>Electroware</Link>
                </h1>
            </div>
            <div className={styles["header__form"]}>
                <form action="GET" name="search-input">
                    <input type="text" />
                    {/* <input type="submit" value={"Pesquisar"} /> */}
                    <button>
                        <MagnifyingGlass
                            size={20}
                            color="white"
                            weight="bold"
                        />
                    </button>
                </form>
            </div>
            <div className={styles["header__user-panel"]}>
                {(isLogged && (
                    <div className={styles["header__user-panel__main--logged"]}>
                        <strong>Ola, Lucas</strong>
                        <a href="">Ver perfil</a>
                    </div>
                )) || (
                    <div className={styles["header__user-panel__main"]}>
                        <a href="">Entre em sua conta</a>
                    </div>
                )}

                <ShoppingCart size={30} color="white" />
            </div>
        </header>
    );
};
