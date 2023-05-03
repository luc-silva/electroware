import { ChangeEvent, useState } from "react";
import { PasswordInput } from "../Inputs/PasswordInput";
import { SubmitBtn } from "../Buttons/SubmitBtn";
import styles from "./SettingsCredentials.module.css";
import { CredentialsPasswordForm } from "../Forms/CredintialsPasswordForm";
import { CredentialsEmailForm } from "../Forms/CredentialsEmailForm";
import { useNavigate } from "react-router-dom";

export const SettingsCredentials = ({
    showToast,
    user,
}: {
    user: IUserSession;
    showToast: Function;
}) => {
    return (
        <section className={styles["settings-credentials"]}>
            <div className={styles["settings-credentials__title"]}>
                <h3>Credênciais</h3>
                <p>Altere seu email ou sua senha.</p>
            </div>
            <div className={styles["settings-credentials__container"]}>
                <div className={styles["settings-credentials__email-form"]}>
                    <CredentialsPasswordForm user={user} showToast={showToast}/>
                </div>
                <div
                    className={styles["settings-credentials__password-form"]}
                >
                   <CredentialsEmailForm user={user} showToast={showToast}/>
                </div>
            </div>
        </section>
    );
};
