import { useState } from "react";
import { ProfileSettingsForm } from "../Forms/ProfileSettingsForm";
import styles from "./EditProfile.module.css";
import { InfoToast } from "../InfoToast";

export const EditProfile = ({ user, showToast }: { user: IUserSession, showToast:Function }) => {
    return (
        <section className={styles["settings__edit-profile"]}>
            <div className={styles["edit-profile__title"]}>
                <h3>Edite o seu perfil</h3>
            </div>
            <div>
                <ProfileSettingsForm user={user} showToast={showToast}/>
            </div>
        </section>
    );
};
