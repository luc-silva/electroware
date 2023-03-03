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
                <h1>Create an account</h1>
                <p>Don't waste your money on other marketplaces anymore!</p>
            </div>
            <div className={styles["registration-form"]}>
                <form action="POST" onChange={handleChange} onSubmit={handleSubmit}>
                    <input
                        name="first"
                        value={form.first}
                        type="text"
                        placeholder="First Name"
                        required
                    />
                    <input
                        name="last"
                        value={form.last}
                        type="text"
                        placeholder="Last Name" 
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
                        placeholder="Password"
                        required
                    />
                    <input
                        type="submit"
                        value="Crie uma conta"
                    />
                </form>
                <Link to="/login">Already have an account? Sign in </Link>
            </div>
        </div>
    );
};
