import { FormEvent, useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { SubmitBtn } from "../Buttons/SubmitBtn";
import { UserImageInput } from "../Inputs/UserImageInput";
import { LocationInput } from "../Inputs/LocationInput";
import { NameInput } from "../Inputs/NameInput";
import styles from "./ProfileSettingsForm.module.css";

export const ProfileSettingsForm = ({ user }: { user: UserProps }) => {
    let formInitalState = {
        name: {
            first: "",
            last: "",
        },
        location: {
            state: "",
            country: "",
        },
        description: "",
    };
    let [form, setForm] = useState(formInitalState);

    useEffect(() => {
        UserService.getUserInfo(user.id).then(setForm);
    }, []);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await UserService.updateAccountDetails(user.id, user.token, form);
    }

    function handleChange(event: FormEvent<HTMLFormElement>) {
        if (
            event.target instanceof HTMLInputElement ||
            event.target instanceof HTMLSelectElement
        ) {
            let targetName = event.target.name;
            let targetValue = event.target.value;
            if (targetName === "first" || targetName === "last") {
                setForm({
                    ...form,
                    name: { ...form.name, [targetName]: targetValue },
                });
            } else if (targetName === "state" || targetName === "country") {
                setForm({
                    ...form,
                    location: { ...form.location, [targetName]: targetValue },
                });
            } else {
                setForm({ ...form, [targetName]: targetValue });
            }
        }
    }

    return (
        <form
            className={styles["edit-profile__form"]}
            action="POST"
            name="edit-form"
            onSubmit={handleSubmit}
            onChange={handleChange}
        >
            <div className={styles["form__image"]}>
                <div className={styles["image-input__container"]}>
                    <UserImageInput user={user} />
                </div>
            </div>
            <div className={styles["form__main"]}>
                <div className={styles["input__container"]}>
                    <label htmlFor="description">Descrição do Perfil</label>
                    <textarea
                        name="description"
                        maxLength={200}
                        value={form.description}
                    />
                </div>
                <div className={styles["input__larger-container"]}>
                    <NameInput
                        firstNameState={form.name.first}
                        lastNameState={form.name.last}
                    />
                </div>
                <div className={styles["input__larger-container"]}>
                    <LocationInput
                        locationCountry={form.location.country}
                        locationState={form.location.state}
                    />
                </div>

                <div className={styles["form__main__submit"]}>
                    <SubmitBtn textValue="Salvar" />
                </div>
            </div>
        </form>
    );
};
