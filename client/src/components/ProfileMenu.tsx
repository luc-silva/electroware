import { Question, SignOut, Sliders } from "phosphor-react";
import { Link } from "react-router-dom";
import styles from "./ProfileMenu.module.css";

export const ProfileMenu = ({
    user,
    isActive,
    toggleMenu,
}: {
    user: UserProps;
    isActive: Boolean;
    toggleMenu: Function;
}) => {

    if (!isActive) return null;
    return (
        <div className={styles["profile-menu"]} role="menu">
            <div className={styles["profile-menu__links"]}>
                <Link to={"/config"}>
                    <Sliders size={20} color="var(--text-color)"/>
                    <p>Configurações</p>
                </Link>
                <Link to={"/faq"}>
                    <Question size={20} color="var(--text-color)"/>
                    <p>FAQ</p>
                </Link>
            </div>
            <div className={styles["profile-menu__sign-out"]}>
                <Link to={"/home"}>
                    <SignOut size={20} />
                    <p>Sair</p>
                </Link>
            </div>
        </div>
    );
};
