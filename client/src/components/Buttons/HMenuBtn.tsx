import styles from "./HMenuBtn.module.css";
import { List } from "phosphor-react";
import { useState } from "react";

export const HMenuBtn = ({ toggleHMenu }: { toggleHMenu: Function }) => {
    let [isMenuActive, toggleMenu] = useState(false);
    function showHamburguerMenu() {
        toggleMenu(!isMenuActive);
    }
    return (
        <button
            className={styles["hmenu-btn"]}
            onClick={() => {
                toggleHMenu();
            }}
        >
            <List size={30} weight="bold" />
        </button>
    );
};
