import axios, { AxiosResponse } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export const Login = ({
    user,
    setUser,
}: {
    user: UserProps;
    setUser: Function;
}) => {
    let formInitialValue = {
        email: "",
        password: "",
    };
    let [form, setForm] = useState(formInitialValue);
    let navigate = useNavigate();

    function handleChange(event: FormEvent<HTMLFormElement>) {
        let target = event.target;
        if (target instanceof HTMLInputElement) {
            setForm({ ...form, [target.name]: target.value });
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            axios
                .post("http://localhost:6060/api/login", form)
                .then(setLocalstorageToken)
                .then(setCurrentUser)
                .catch(alert);
            navigate("/home");
        } catch (error) {
            alert(error);
        }
    }
    function setLocalstorageToken(response: AxiosResponse) {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response;
    }
    function setCurrentUser({ data }: AxiosResponse) {
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
                    <input type="submit" value="Entrar" />
                </form>
                <Link to="/registration">Crie uma conta</Link>
            </section>
        </main>
    );
};
