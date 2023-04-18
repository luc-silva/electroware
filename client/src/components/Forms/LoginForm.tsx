import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFormInitialValue } from "../../constants/initialStates";
import UserService from "../../services/UserService";
import { SubmitBtn } from "../Buttons/SubmitBtn";
import styles from "./LoginForm.module.css";

export const LoginForm = ({
    setUser,
    showErrorToast,
}: {
    showErrorToast: Function;
    setUser: Function;
}) => {
    let [form, setForm] = useState(loginFormInitialValue);
    let navigate = useNavigate();

    function setCurrentUser(data: UserProps) {
        setUser(() => {
            return { ...data, logged: true };
        });
    }
    function handleChange(event: FormEvent<HTMLFormElement>) {
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
                showErrorToast(response.data);
            });
    }
    return (
        <form action="POST" onChange={handleChange} onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email" required />
            <input
                name="password"
                type="password"
                placeholder="Senha"
                required
            />
            <SubmitBtn textValue="Entrar" />
        </form>
    );
};
