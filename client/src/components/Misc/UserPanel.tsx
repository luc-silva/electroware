import { Link } from "react-router-dom";

import { Bookmarks, CaretDown, CaretUp, ShoppingCart } from "phosphor-react";
import styles from "./UserPanel.module.css";

export const UserPanel = ({
    user,
    handleInfoMenu,
    isMenuActive,
}: {
    user: UserProps;
    handleInfoMenu: Function;
    isMenuActive: boolean;
}) => {
    const showModal = () => {
        handleInfoMenu();
    };
    return (
        <>
            {(user.logged && (
                <div className={styles["panel__main--logged"]}>
                    <Link to={"/shopping-cart"}>
                        <ShoppingCart size={30} color="white" />
                    </Link>
                    <Link to={"/wishlist"}>
                        <Bookmarks size={30} color="white" />
                    </Link>
                    <div
                        className={styles["panel__user"]}
                        onClick={showModal}
                    >
                        <div>
                            <strong>{`Olá, ${user.username}`}</strong>
                            <p>Ver infos</p>
                        </div>
                        {(isMenuActive && (
                            <CaretUp size={30} color="white" />
                        )) || <CaretDown size={30} color="white" />}
                    </div>
                </div>
            )) || (
                <div className={styles["panel__main"]}>
                    <Link to="/login">Entre em sua conta</Link>
                </div>
            )}
        </>
    );
};
