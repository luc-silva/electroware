import { ChangeEvent, FormEvent, useState } from "react";
import { SubmitBtn } from "../Buttons/SubmitBtn";
import { PasswordInput } from "../Inputs/PasswordInput";
import styles from "./CredentialsPasswordForm.module.css";
import UserService from "../../services/UserService";

export const CredentialsPasswordForm = ({
    user,
    showToast,
}: {
    user: IUserSession;
    showToast: Function;
}) => {
    let [passwordForm, setPasswordForm] = useState({
        password: "",
        new_password: "",
    });
    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        let target = event.target;
        if (target) {
            setPasswordForm({ ...passwordForm, [target.name]: target.value });
        }
    }
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        await UserService.updateUserPassword(user.token, passwordForm)
            .then(({ data }) => {
                showToast(data.message);
            })
            .catch(({ response }) => {
                showToast(response.data, "warning");
            });
    }
    return (
        <>
            <form
                method="POST"
                onSubmit={handleSubmit}
                className={styles["creditials-password-form"]}
            >
                <div className={styles["creditials-password-form__main"]}>
                    <div className={styles["input-container"]}>
                        <PasswordInput
                            inputState={passwordForm.password}
                            inputPlaceholder="Senha Antiga"
                            onChange={handlePasswordChange}
                            maxLength={30}
                            required
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <PasswordInput
                            inputState={passwordForm.new_password}
                            inputPlaceholder="Senha Nova"
                            inputName="new_password"
                            onChange={handlePasswordChange}
                            maxLength={30}
                            required
                        />
                    </div>
                </div>
                <div>
                    <SubmitBtn textValue="Atualizar Senha" />
                </div>
            </form>
        </>
    );
};
