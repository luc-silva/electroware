import { ProfileSettingsForm } from "../Forms/ProfileSettingsForm";
import { ImageInput } from "../Inputs/ImageInput";
import styles from "./EditProfile.module.css";

export const EditProfile = ({ user }: { user: UserProps }) => {
    return (
        <section className={styles["settings__edit-profile"]}>
            <div className={styles["edit-profile__title"]}>
                <h3>Edite o seu perfil</h3>
            </div>
            <div>
                <ProfileSettingsForm user={user} />
            </div>
        </section>
    );
};
