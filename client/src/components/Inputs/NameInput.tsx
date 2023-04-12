import { ChangeEvent, EventHandler } from "react";
import styles from "./NameInput.module.css";

export const NameInput = ({
    firstNameState,
    lastNameState,
}: {
    firstNameState: string;
    lastNameState: string;
}) => {
    return (
        <>
            <div className={styles["input__container"]}>
                <label htmlFor="first">Nome</label>
                <input
                    type="text"
                    name="first"
                    maxLength={200}
                    value={firstNameState}
                />
            </div>
            <div className={styles["input__container"]}>
                <label htmlFor="last">Sobrenome</label>
                <input
                    type="text"
                    name="last"
                    maxLength={200}
                    value={lastNameState}
                />
            </div>
        </>
    );
};
