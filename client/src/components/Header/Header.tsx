import { List } from "phosphor-react";

import styles from "./Header.module.css"

export const Header = () => {
    return (
        <header className={styles["header"]}>
            <List size={38} weight="bold" color={"var(--secondary-color)"}/>
            <h1 className={styles["header__logo"]}>
                Electroware
            </h1>
        </header>
    );
};