import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitBtn } from "../components/Buttons/SubmitBtn";
import { LoginForm } from "../components/Forms/LoginForm";
import { InfoToast } from "../components/InfoToast";
import { loginFormInitialValue } from "../constants/initialStates";
import UserService from "../services/UserService";
import styles from "./Login.module.css";

export const Login = ({
    user,
    setUser,
    showToast
}: {
    user: UserProps;
    setUser: Function;
    showToast:Function
}) => {

    return (
        <main className={styles["login"]}>
            <div className={styles["login-text"]}>
                <h1>Login</h1>
                <p>Entre em sua conta e comece a gastar o seu dinheiro!</p>
            </div>
            <section className={styles["login-form"]}>
                <LoginForm setUser={setUser} showToast={showToast} />
                <Link to="/registration">Crie uma conta</Link>
            </section>
        </main>
    );
};
