import { ChangeEvent, FormEvent, useState } from "react";

import { MagnifyingGlass } from "phosphor-react";
import styles from "./SearchForm.module.css";
import { useNavigate } from "react-router-dom";

export const SearchForm = ({ closeModal }: { closeModal?: Function }) => {
    let [searchInputValue, setSearchInputValue] = useState("");
    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        let target = event.target;
        if (target) {
            setSearchInputValue(target.value);
        }
    };

    let navigate = useNavigate();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchInputValue) {
            navigate(`/search/${searchInputValue}`);
        }
        if (closeModal) {
            closeModal();
        }
    };

    return (
        <form
            action="POST"
            name="search-input"
            onSubmit={handleSubmit}
            className={styles["search__form"]}
        >
            <input
                type="text"
                value={searchInputValue}
                onChange={handleSearchInput}
                className={styles["search__input"]}
                placeholder="Pesquisar"
            />
            <label className={styles["search__icon"]}>
                <input type="submit" value="Pesquisar" />
                <MagnifyingGlass size={20} color="white" weight="bold" />
            </label>
        </form>
    );
};
