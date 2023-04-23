import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { SettingsNavigation } from "../components/Buttons/SettingsNavigation";
import styles from "./Settings.module.css";

export const Settings = ({
    user,
    setUser,
}: {
    user: UserProps;
    setUser: Function;
}) => {
    let navigate = useNavigate();
    if (!user.logged) {
        navigate("/login");
    }


    return (
        <main role={"main"} className={styles["settings"]}>
            <div className={styles["settings__navigation"]}>
                <SettingsNavigation />
            </div>
            <div className={styles["settings__panel"]}>
                <Outlet />
            </div>
        </main>
    );
};
