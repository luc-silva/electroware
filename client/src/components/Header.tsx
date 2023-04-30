import { WebsiteLogo } from "./Misc/WebsiteLogo";
import { UserPanel } from "./Misc/UserPanel";
import { SearchForm } from "./Forms/SearchForm";

import styles from "./Header.module.css";
import { HMenuBtn } from "./Buttons/HMenuBtn";

export const Header = ({
    user,
    setUser,
    handleInfoMenu,
    isMenuActive,
    toggleHMenu
}: {
    user: IUserSession;
    setUser: Function;
    handleInfoMenu: Function;
    isMenuActive: boolean;
    toggleHMenu:Function
}) => {
    return (
        <header className={styles["header"]}>
            <div className={styles["header__main"]}>
                <WebsiteLogo />
            </div>
            <div className={styles["header__form"]}>
                <SearchForm />
            </div>
            <div  className={styles["header__hmenu"]}>
                <HMenuBtn toggleHMenu={toggleHMenu}/>
            </div>
            <div className={styles["header__panel"]}>
                <UserPanel user={user} isMenuActive={isMenuActive} handleInfoMenu={handleInfoMenu}/>
            </div>
        </header>
    );
};
