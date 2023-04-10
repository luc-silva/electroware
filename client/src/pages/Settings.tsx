import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

import { ProfileSettingsForm } from "../components/Forms/ProfileSettingsForm";
import { DeleteAccount } from "../components/Sections/DeleteAccount";

import styles from "./Settings.module.css";
import { SettingsTransaction } from "../components/Sections/SettingsTransaction";

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
    let [userTransactions, setUserTransactions] = useState([]);
    useEffect(() => {
        UserService.getUserTransactions(user.id, user.token).then((data) => {
            setUserTransactions(data);
        });
    }, []);

    return (
        <main role={"main"} className={styles["settings"]}>
            <section className={styles["settings__edit-profile"]}>
                <div className={styles["edit-profile__title"]}>
                    <h3>Edite o seu perfil</h3>
                </div>
                <ProfileSettingsForm user={user} />
            </section>
            <SettingsTransaction userTransactions={userTransactions} />
            <DeleteAccount user={user} />
        </main>
    );
};
