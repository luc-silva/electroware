import { useState } from "react";
import { ProfileSettingsForm } from "../Forms/ProfileSettingsForm";
import styles from "./EditProfile.module.css";
import { InfoToast } from "../InfoToast";

export const EditProfile = ({ user }: { user: UserProps }) => {
    let [isToastActive, toggleToast] = useState(false);
    let [toastMessage, setToastMessage] = useState("");

    function showToast(message:string) {
        setToastMessage(message)
        toggleToast(!isToastActive);
    }

    return (
        <section className={styles["settings__edit-profile"]}>
            <div className={styles["edit-profile__title"]}>
                <h3>Edite o seu perfil</h3>
            </div>
            <div>
                <ProfileSettingsForm user={user} showToast={showToast}/>
            </div>
            <InfoToast
                isActive={isToastActive}
                message={toastMessage}
                toggle={toggleToast}
                type="info"
            />
        </section>
    );
};
