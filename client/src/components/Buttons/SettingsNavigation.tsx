import { NavLink } from "react-router-dom";
import styles from "./SettingsNavigation.module.css";
import {
    CurrencyCircleDollar,
    Eraser,
    IdentificationCard,
    Key,
    Package,
} from "phosphor-react";

function setClass(props: { isActive: boolean; isPending: boolean }) {
    return props.isActive ? styles["anchor-btn--active"] : styles["anchor-btn"];
}

export const SettingsNavigation = () => {
    return (
        <nav className={styles["settings-navigation"]}>
            <NavLink to={"/settings/"} className={setClass}>
                <IdentificationCard size={25} />
                Editar Perfil
            </NavLink>
            <NavLink to={"products"} className={setClass}>
                <Package size={25} />
                Produtos
            </NavLink>
            <NavLink to={"transactions"} className={setClass}>
                <CurrencyCircleDollar size={25} />
                Transações
            </NavLink>
            <NavLink to={"delete-account"} className={setClass}>
                <Eraser size={25} />
                Excluir dados
            </NavLink>
            <NavLink to={"credentials"} className={setClass}>
                <Key size={25} />
                Acesso
            </NavLink>
        </nav>
    );
};
