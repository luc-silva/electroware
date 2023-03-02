import axios from "axios";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

export const Login = () => {
    let formInitialValue = {
        email: "",
        password: "",
    };
    let [form, setForm] = useState(formInitialValue);

    function handleChange(event: FormEvent<HTMLFormElement>) {
        let target = event.target;
        if (target instanceof HTMLInputElement) {
            setForm({ ...form, [target.name]: target.value });
        }
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post("http://localhost:6060/api/login", form);
    }

    return (
        <div className={styles["login"]}>
            <div className={styles["login-text"]}>
                <h1>Login</h1>
                <p>Log in to your account and start spending your money!</p>
            </div>
            <div className={styles["login-form"]}>
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
                        placeholder="Password"
                        required
                    />
                    <input type="submit" value="Log In" />
                </form>
                <Link to="/registration">Create an account</Link>
            </div>
        </div>
    );
};
