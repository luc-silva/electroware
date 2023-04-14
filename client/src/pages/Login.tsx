import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitBtn } from "../components/Buttons/SubmitBtn";
import { loginFormInitialValue } from "../constants/initialStates";
import UserService from "../services/UserService";
import styles from "./Login.module.css";

export const Login = ({
    user,
    setUser,
}: {
    user: UserProps;
    setUser: Function;
}) => {
    let [form, setForm] = useState(loginFormInitialValue);
    let navigate = useNavigate();

    function handleChange(event: FormEvent<HTMLFormElement>) {
        let target = event.target;
        if (target instanceof HTMLInputElement) {
            setForm({ ...form, [target.name]: target.value });
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        UserService.logInUser(form)
            .then(setLocalstorageToken)
            .then(setCurrentUser)
            .then(() => {
                navigate("/");
            });
    }
    function setLocalstorageToken(data: UserProps) {
        localStorage.setItem("user", JSON.stringify(data));
        return data;
    }
    function setCurrentUser(data: UserProps) {
        setUser(() => {
            return { ...data, logged: true };
        });
    }
    return (
        <main className={styles["login"]}>
            <div className={styles["login-text"]}>
                <h1>Login</h1>
                <p>Entre em sua conta e comece a gastar o seu dinheiro!</p>
            </div>
            <section className={styles["login-form"]}>
                <form
                    action="POST"
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                >
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Senha"
                        required
                    />
                    <SubmitBtn textValue="Entrar" />
                </form>
                <Link to="/registration">Crie uma conta</Link>
            </section>
        </main>
    );
};
