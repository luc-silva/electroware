import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { profileSettingsFormInitalState } from "../../constants/initialStates";

//components & utils
import UserService from "../../services/UserService";
import { SubmitBtn } from "../Buttons/SubmitBtn";
import { UserImageInput } from "../Inputs/UserImageInput";
import { LocationInput } from "../Inputs/LocationInput";
import { NameInput } from "../Inputs/NameInput";

//style
import styles from "./ProfileSettingsForm.module.css";
import { TextareaInput } from "../Inputs/TextareaInput";
import { AxiosResponse } from "axios";

export const ProfileSettingsForm = ({ user, showToast }: { user: IUserSession, showToast:Function }) => {
    let [form, setForm] = useState(profileSettingsFormInitalState);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await UserService.updateAccountDetails(user.id, user.token, form).then(
            ({data}:AxiosResponse) => {
                showToast(data.message,"info");
            }
        );
    }

    function handleChange(event: ChangeEvent<HTMLElement>) {
        if (
            event.target instanceof HTMLInputElement ||
            event.target instanceof HTMLSelectElement ||
            event.target instanceof HTMLTextAreaElement
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

    useEffect(() => {
        UserService.getUserInfo(user.id).then(setForm);
    }, [user.id]);
    return (
        <form
            className={styles["edit-profile__form"]}
            action="POST"
            name="edit-form"
            onSubmit={handleSubmit}
        >
            <div className={styles["form__image"]}>
                <div className={styles["image-input__container"]}>
                    <UserImageInput inputType="userImage" user={user} />
                </div>
            </div>
            <div className={styles["form__main"]}>
                <div className={styles["input__container"]}>
                    <TextareaInput
                        initialValue={form.description}
                        inputName="description"
                        inputText="Descrição do perfil"
                        maxLength={200}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles["input__larger-container"]}>
                    <NameInput
                        firstNameState={form.name.first}
                        lastNameState={form.name.last}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles["input__larger-container"]}>
                    <LocationInput
                        locationCountry={form.location.country}
                        locationState={form.location.state}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles["form__main__submit"]}>
                    <SubmitBtn textValue="Salvar" />
                </div>
            </div>
        </form>
    );
};
