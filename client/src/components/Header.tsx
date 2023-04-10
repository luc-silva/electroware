import { WebsiteLogo } from "./Misc/WebsiteLogo";
import { UserPanel } from "./Misc/UserPanel";
import { SearchForm } from "./Forms/SearchForm";

import styles from "./Header.module.css";

export const Header = ({
    user,
    setUser,
    handleInfoMenu,
    isMenuActive,
}: {
    user: UserProps;
    setUser: Function;
    handleInfoMenu: Function;
    isMenuActive: boolean;
}) => {
    return (
        <header className={styles["header"]}>
            <div className={styles["header__main"]}>
                <WebsiteLogo />
            </div>
            <div className={styles["header__form"]}>
                <SearchForm />
            </div>
            <div className={styles["header__panel"]}>
                <UserPanel user={user} isMenuActive={isMenuActive} handleInfoMenu={handleInfoMenu}/>
            </div>
        </header>
    );
};
