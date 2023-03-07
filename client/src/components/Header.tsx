import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlass, ShoppingCart } from "phosphor-react";

import styles from "./Header.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

export const Header = () => {
    let isLogged = true;
    let navigate = useNavigate()
    let [searchInput, setSearchInput] = useState("");
    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        let target = event.target;
        if (target) {
            setSearchInput(target.value);
        }
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        navigate(`/search/${searchInput}`)
    }

    return (
        <header className={styles["header"]}>
            <div className={styles["header__main"]}>
                <h1 className={styles["header-logo"]}>
                    <Link to={"/home"}>Electroware</Link>
                </h1>
            </div>
            <div className={styles["header__form"]}>
                <form action="POST" name="search-input" onSubmit={handleSubmit}>
                    <input type="text"  value={searchInput} onChange={handleSearchInput} />
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
                {(isLogged && (
                    <div className={styles["header__user-panel__main--logged"]}>
                        <strong>Ola, Lucas</strong>
                        <a href="/user/me">Ver perfil</a>
                    </div>
                )) || (
                    <div className={styles["header__user-panel__main"]}>
                        <a href="">Entre em sua conta</a>
                    </div>
                )}

                <Link to={"/shopping-cart"}>
                    <ShoppingCart size={30} color="white" />
                </Link>
            </div>
        </header>
    );
};
