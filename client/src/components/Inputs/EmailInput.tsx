import { ChangeEvent, EventHandler } from "react";
import styles from "./EmailInput.module.css";

export const EmailInput = ({
    onChange,
    label = true,
    required = true,
    inputName = "email",
    labelText = "",
    inputPlaceholder = "email",
    inputState,
}: {
    onChange: EventHandler<ChangeEvent>;
    label?: boolean;
    required?: boolean;
    inputName?: string;
    labelText?: string;
    inputPlaceholder?: string;
    inputState: string;
}) => {
    return (
        <>
            {label && <label>{labelText}</label>}
            <input
                name={inputName}
                value={inputState}
                type="email"
                placeholder={inputPlaceholder}
                onChange={onChange}
                required={required}
                className={styles["email-input"]}
            />
        </>
    );
};
