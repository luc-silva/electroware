import { FormEvent,  useState } from "react";
import ImageService from "../../services/ImageService";
import { SubmitBtn } from "../Buttons/SubmitBtn";
import { ImageInput } from "../Inputs/ImageInput";
import styles from "./ProfileSettingsForm.module.css";

export const ProfileSettingsForm = ({ user }: { user: UserProps }) => {
    let formInitalState = {
        imageFile: null as File | null,
    };
    let [form, setForm] = useState(formInitalState);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let formData = new FormData();
        if (form.imageFile) {
            formData.append("imageFile", form.imageFile);
            console.log(formData);
            await ImageService.uploadImage(formData, user.token);
        }
    }

    function handleChange(event: FormEvent<HTMLFormElement>) {
        if (
            event.target instanceof HTMLInputElement &&
            event.target.name === "imageFile"
        ) {
            let { files } = event.target;
            if (files && files[0] instanceof File) {
                setForm({ ...form, imageFile: files[0] });
            }
        }
    }

    return (
        <form
            className={styles["edit-profile__form"]}
            action="POST"
            onSubmit={handleSubmit}
            onChange={handleChange}
        >
            <div className={styles["form__image"]}>
                <div className={styles["image-input__container"]}>
                    <ImageInput user={user} />
                </div>
            </div>
            <div className={styles["form__main"]}>
                <div className={styles["input__container"]}>
                    <label htmlFor="description">Descrição do Perfil</label>
                    <textarea name="description" maxLength={200} />
                </div>
                <div className={styles["input__larger-container"]}>
                    <div className={styles["input__container"]}>
                        <label htmlFor="first">Nome</label>
                        <input type="text" name="first" maxLength={200} />
                    </div>
                    <div className={styles["input__container"]}>
                        <label htmlFor="last">Sobrenome</label>
                        <input type="text" name="last" maxLength={200} />
                    </div>
                </div>
                <div className={styles["input__larger-container"]}>
                    <div className={styles["input__container"]}>
                        <label htmlFor="state">Estado</label>
                        <input type="text" name="state" maxLength={200} />
                    </div>
                    <div className={styles["input__container"]}>
                        <label htmlFor="country">País</label>
                        <input type="text" name="country" maxLength={200} />
                    </div>
                </div>

                <div className={styles["form__main__submit"]}>
                    <SubmitBtn textValue="Salvar" />
                </div>
            </div>
        </form>
    );
};
