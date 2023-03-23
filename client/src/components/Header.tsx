import { Link, useNavigate } from "react-router-dom";
import {
    Bookmarks,
    CaretDown,
    CaretUp,
    MagnifyingGlass,
    ShoppingCart,
} from "phosphor-react";

import styles from "./Header.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

export const Header = ({
    user,
    setUser,
    handleInfoMenu,
    isMenuActive,
}: {
    user: UserProps;
    setUser: Function;
    handleInfoMenu: Function;
    isMenuActive: Boolean;
}) => {
    let navigate = useNavigate();
    let [searchInput, setSearchInput] = useState("");

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        let target = event.target;
        if (target) {
            setSearchInput(target.value);
        }
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/search/${searchInput}`);
    };
    const showModal = (event: React.MouseEvent<HTMLDivElement>) => {
        handleInfoMenu();
    };
    return (
        <header className={styles["header"]}>
            <div className={styles["header__main"]}>
                <h1 className={styles["header-logo"]}>
                    <Link to={"/"}>Electroware</Link>
                </h1>
            </div>
            <div className={styles["header__form"]}>
                <form action="POST" name="search-input" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleSearchInput}
                    />
                    <label className={styles["search-icon"]}>
                        <input type="submit" value={"Pesquisar"} />
                        <MagnifyingGlass
                            size={20}
                            color="white"
                            weight="bold"
                        />
                    </label>
                </form>
            </div>
            <div className={styles["header__user-panel"]}>
                {(user.logged && (
                    <div className={styles["header__user-panel__main--logged"]}>
                        <Link to={"/shopping-cart"}>
                            <ShoppingCart size={30} color="white" />
                        </Link>
                        <Link to={"/wishlist"}>
                            <Bookmarks size={30} color="white" />
                        </Link>
                        <div
                            className={styles["header__user-panel__user"]}
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
                    <div className={styles["header__user-panel__main"]}>
                        <Link to="/login">Entre em sua conta</Link>
                    </div>
                )}
            </div>
        </header>
    );
};
