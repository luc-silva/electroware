import { Link } from "react-router-dom";
import { ImageBox } from "./ImageBox";
import styles from "./HMenu.module.css";
import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import ImageService from "../../services/ImageService";
import { imageInitialValue } from "../../constants/initialStates";
import { createImage } from "../../utils/operations";

export const HMenu = ({
    user,
    isMenuActive,
    toggleHMenu,
}: {
    user: UserProps;
    isMenuActive: boolean;
    toggleHMenu: Function;
}) => {
    
    let [userImage, setUserImage] = useState(imageInitialValue);
    let [isLoading, toggleLoading] = useState(true);
    useEffect(() => {
        if (user.id) {
            ImageService.getUserImage(user.id)
            .then(({data}) => {setUserImage(data)})
            .then(() => {
                toggleLoading(false);
            });
        }
    }, []);
    if (!isMenuActive) return null;
    return (
        <div className={styles["hmenu"]}>
            <div className={styles["hmenu__header"]}>
                <div className={styles["hmenu__main"]}>
                    {(user.logged && (
                        <>
                            <div className={styles["hmenu__user-picture"]}>
                                <ImageBox
                                    isLoading={isLoading}
                                    imgSrc={createImage(userImage)}
                                />
                            </div>
                            <div className={styles["hmenu__user-info"]}>
                                <strong>{user.username}</strong>
                                <p>{user.funds} R$</p>
                            </div>
                        </>
                    )) ||
                        null}
                </div>
                <div className={styles["hmenu__close-btn"]}>
                    <X
                        size={30}
                        weight="bold"
                        onClick={() => {
                            toggleHMenu();
                        }}
                    />
                </div>
            </div>
            {(user.logged && (
                <nav className={styles["hmenu__navigation"]}>
                    <ul className={styles["hmenu__navigation__links"]}>
                        <li>
                            <Link to={"/settings"}>Configurações</Link>
                        </li>
                        <li>
                            <Link to={"/create-offer"}>Anunciar Produto</Link>
                        </li>
                        <li>
                            <Link to={"/faq"}>FAQ</Link>
                        </li>
                    </ul>
                    <button className={styles["logout-btn"]}>
                        <Link to={"/"}>Sair</Link>
                    </button>
                </nav>
            )) || (
                <div className={styles["hmenu__login-dialog"]}>
                    <h2>Entre em sua conta.</h2>
                    <ul className={styles["hmenu__login-dialog__links"]}>
                        <li>
                            <Link to={"/login"}>Acessar conta.</Link>
                        </li>
                        <li>
                            <Link to={"/registration"}>Criar conta.</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};
