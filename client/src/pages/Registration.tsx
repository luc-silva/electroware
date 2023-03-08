import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Registration.module.css";

import axios from "axios";

export const Registration = () => {
    let formInitialValues = {
        first: "",
        last: "",
        email: "",
        password: "",
    };
    let [form, setForm] = useState(formInitialValues);
    const navigate = useNavigate()

    function handleChange(event: FormEvent<HTMLFormElement>) {
        let target = event.target;
        if (target instanceof HTMLInputElement) {
            setForm({ ...form, [target.name]: target.value });
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post("http://localhost:6060/api/register", {
            ...form,
            name: { first: form.first, last: form.last },
        }).catch(alert)
        navigate("/login")
    }

    useEffect(() => {
        
    })

    return (
        <div className={styles["registration"]}>
            <div className={styles["registration-text"]}>
                <h1>Crie uma conta</h1>
                <p>Não gaste o seu dinheiro em outros sites!</p>
            </div>
            <div className={styles["registration-form"]}>
                <form action="POST" onChange={handleChange} onSubmit={handleSubmit}>
                    <input
                        name="first"
                        value={form.first}
                        type="text"
                        placeholder="Nome"
                        required
                    />
                    <input
                        name="last"
                        value={form.last}
                        type="text"
                        placeholder="Sobrenome" 
                    />
                    <input
                        name="email"
                        value={form.email}
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        name="password"
                        value={form.password}
                        type="password"
                        placeholder="Senha"
                        required
                    />
                    <input
                        type="submit"
                        value="Crie uma conta"
                    />
                </form>
                <Link to="/login">Já possui uma conta? Entre </Link>
            </div>
        </div>
    );
};
