import { Money, Note, Question, SignOut, Sliders } from "phosphor-react";
import { Link } from "react-router-dom";
import styles from "./ProfileMenu.module.css";

export const ProfileMenu = ({
    user,
    isActive,
    toggleMenu,
    setUser
}: {
    user: UserProps;
    setUser: Function;
    isActive: Boolean;
    toggleMenu: Function;
}) => {

    function handleLogout(){
        toggleMenu()
        setUser({
            id: "",
            saldo: 0,
            username: "",
            token: "",
            logged: false,
        })
    }

    if (!isActive) return null;
    return (
        <div className={styles["profile-menu"]} role="menu">
            <div className={styles["profile-menu__links"]}>
                <Link to={"/config/billings"}>
                    <Money size={20} color="var(--text-color)" />
                    <p>{`Saldo: ${user.saldo} R$`}</p>
                </Link>
                <Link to={"/make-offer"}>
                    <Note  size={20} color="var(--text-color)" />
                    <p>Anunciar Produto</p>
                </Link>
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
                <Link to={"/home"} onClick={handleLogout}>
                    <SignOut size={20} />
                    <p>Sair</p>
                </Link>
            </div>
        </div>
    );
};
