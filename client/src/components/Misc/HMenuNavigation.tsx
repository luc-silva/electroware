import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { userSessionInitialState } from "../../constants/initialStates";
import styles from "./HMenuNavigation.module.css";

export const HMenuNavigation = ({
    setUser,
    closeMenu,
}: {
    setUser: Function;
    closeMenu: MouseEventHandler;
}) => {
    function logOutUser() {
        setUser(userSessionInitialState);
    }

    return (
        <nav className={styles["hmenu__navigation"]}>
            <ul className={styles["hmenu__navigation__links"]}>
                <li onClick={closeMenu}>
                    <Link to={"/settings/"}>Configurações</Link>
                </li>
                <li onClick={closeMenu}>
                    <Link to={"/create-offer"}>Anunciar Produto</Link>
                </li>
                <li onClick={closeMenu}>
                    <Link to={"/faq"}>FAQ</Link>
                </li>
                <li onClick={closeMenu}>
                    <Link to={"/add-funds"}>Adicionar Saldo</Link>
                </li>
            </ul>
            <button className={styles["logout-btn"]} onClick={logOutUser}>
                <Link to={"/"}>Sair</Link>
            </button>
        </nav>
    );
};
