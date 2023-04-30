import UserService from "../../services/UserService";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFormInitialValue } from "../../constants/initialStates";
import { SubmitBtn } from "../Buttons/SubmitBtn";
import { EmailInput } from "../Inputs/EmailInput";
import { PasswordInput } from "../Inputs/PasswordInput";

import styles from "./LoginForm.module.css";
export const LoginForm = ({
    setUser,
    showToast,
}: {
    showToast: Function;
    setUser: Function;
}) => {
    let [form, setForm] = useState(loginFormInitialValue);
    let navigate = useNavigate();

    function setCurrentUser(data: IUserSession) {
        setUser(() => {
            return { ...data, logged: true };
        });
    }
    function handleChange(event: ChangeEvent<HTMLElement>) {
        let target = event.target;
        if (target instanceof HTMLInputElement) {
            setForm({ ...form, [target.name]: target.value });
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        UserService.logInUser(form)
            .then(setCurrentUser)
            .then(() => {
                navigate("/");
            })
            .catch(({ response }) => {
                showToast(response.data, "warning");
            });
    }
    return (
        <form
            action="POST"
            onSubmit={handleSubmit}
            className={styles["login__form"]}
        >
            <div className={styles["input__container"]}>
                <EmailInput 
                    inputState={form.email}
                    onChange={handleChange}
                    inputName="email"
                    inputPlaceholder="Email"
                    required
                    label
                />
            </div>
            <div className={styles["input__container"]}>
                <PasswordInput 
                inputState={form.password}
                inputPlaceholder="Senha"
                maxLength={50}
                onChange={handleChange}
                required

                /> 
            </div>
            <div className={styles["input__container"]}>
                <SubmitBtn textValue="Entrar" />
            </div>
        </form>
    );
};
