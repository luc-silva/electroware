import { ChangeEvent, FormEvent, useState } from "react";
import { SubmitBtn } from "../Buttons/SubmitBtn";
import { PasswordInput } from "../Inputs/PasswordInput";
import UserService from "../../services/UserService";
import styles from "./CredentialsEmailForm.module.css";
import { EmailInput } from "../Inputs/EmailInput";

export const CredentialsEmailForm = ({
    user,
    showToast,
}: {
    user: IUserSession;
    showToast: Function;
}) => {
    let [emailForm, setEmailForm] = useState({
        email: "",
    });
    function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
        let target = event.target;
        if (target) {
            setEmailForm({ ...emailForm, [target.name]: target.value });
        }
    }
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        await UserService.updateUserEmail(user.token, emailForm)
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
                        <EmailInput
                            inputState={emailForm.email}
                            onChange={handleEmailChange}
                            inputName="email"
                            inputPlaceholder="Novo email"
                            required
                        />
                    </div>
                </div>
                <div>
                    <SubmitBtn textValue="Atualizar Email" />
                </div>
            </form>
        </>
    );
};
