import axios from "axios";
import { FormEvent } from "react";
import styles from "./ProfileSettingsForm.module.css";

export const ProfileSettingsForm = ({user}:{user:UserProps}) => {
    let formInitalState={}
    async function handleSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault()
        //axios.post()
    }
    return (
        <form className={styles["edit-profile__form"]} action="POST" onSubmit={handleSubmit}>
            <div className={styles["image-input__container"]}>
                <div className={styles["profile-picture"]}>
                    <img src="" alt="" />
                </div>
                <input type="file" accept=".jpeg, .png" size={1}/>
            </div>
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
        </form>
    );
};
