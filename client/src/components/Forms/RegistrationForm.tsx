import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { registrationFormInitialValues } from "../../constants/initialStates";

import { SubmitBtn } from "../Buttons/SubmitBtn";

import { LocationInput } from "../Inputs/LocationInput";
import { NameInput } from "../Inputs/NameInput";
import styles from "./RegistrationForm.module.css";
import { EmailInput } from "../Inputs/EmailInput";
import { PasswordInput } from "../Inputs/PasswordInput";

export const RegistrationForm = ({ showToast }: { showToast: Function }) => {
    let [form, setForm] = useState(registrationFormInitialValues);
    const navigate = useNavigate();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let target = event.target;
        if (target instanceof HTMLInputElement) {
            setForm({ ...form, [target.name]: target.value });
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let data = {
            ...form,
            name: {
                first: form.first,
                last: form.last,
            },
            location: {
                state: form.state,
                country: form.country,
            },
        };

        await UserService.registerUser(data)
            .then(() => {
                navigate("/login");
            })
            .catch(({ response }) => {
                showToast(response.data, "warning");
            });
    }
    return (
        <form
            action="POST"
            onSubmit={handleSubmit}
            className={styles["registration__form"]}
        >
            <div className={styles["input__container"]}>
                <NameInput
                    labels={false}
                    placeholders
                    firstNameState={form.first}
                    lastNameState={form.last}
                    onChange={handleChange}
                />
            </div>

            <div className={styles["input__container"]}>
                <LocationInput
                    labels={false}
                    placeholders
                    locationCountry={form.country}
                    locationState={form.state}
                    onChange={handleChange}
                />
            </div>

            <div className={styles["input__container"]}>
                <EmailInput
                    inputState={form.email}
                    onChange={handleChange}
                    inputPlaceholder="Email"
                    label={false}
                    labelText="Email"
                    required
                />
            </div>
            <div className={styles["input__container"]}>
                <PasswordInput
                    inputPlaceholder="Senha"
                    inputState={form.password}
                    maxLength={40}
                    onChange={handleChange}
                    inputName="password"
                    required
                />
            </div>
            <div className={styles["input__container"]}>
                <SubmitBtn textValue="Crie uma conta" />
            </div>
        </form>
    );
};
