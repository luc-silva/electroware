import { ChangeEvent, EventHandler } from "react";
import styles from "./NameInput.module.css";

export const NameInput = ({
    labels = true,
    placeholders = false,
    firstNameState,
    lastNameState,
    onChange,
}: {
    labels?: boolean;
    placeholders?: boolean;
    firstNameState: string;
    lastNameState: string;
    onChange: EventHandler<ChangeEvent>;
}) => {
    return (
        <>
            <div className={styles["input__container"]}>
                {labels && <label htmlFor="first">Nome</label>}
                <input
                    type="text"
                    name="first"
                    placeholder={placeholders ? "Nome" : undefined}
                    maxLength={200}
                    value={firstNameState}
                    onChange={onChange}
                    required
                />
            </div>
            <div className={styles["input__container"]}>
                {labels && <label htmlFor="last">Sobrenome</label>}
                <input
                    type="text"
                    name="last"
                    placeholder={placeholders ? "Sobrenome" : undefined}
                    maxLength={200}
                    value={lastNameState}
                    onChange={onChange}
                />
            </div>
        </>
    );
};
