import { Link } from "react-router-dom";
import { ArrowDown, CaretDown, List, MagnifyingGlass, UserList } from "phosphor-react";

import styles from "./Header.module.css";

export const Header = () => {
    return (
        <header className={styles["header"]}>
            <div className={styles["header-main"]}>
                {/* <List
                    size={38}
                    weight="bold"
                    color={"var(--secondary-color)"}
                /> */}
                <h1 className={styles["header-logo"]}>
                    <Link to={"/"}>Electroware</Link>
                </h1>
            </div>
            <div className={styles["header-form"]}>
                <form action="GET" name="search-input">
                    <input type="text" />
                    <input type="submit"/>
                </form>
            </div>
            <div className={styles["header-user-panel"]}>
                <UserList size={30}/>
                <CaretDown size={30}/>
            </div>
        </header>
    );
};
