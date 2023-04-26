import { ChangeEvent, EventHandler } from "react";
import styles from "./PasswordInput.module.css";

export const PasswordInput = ({
    onChange,
    inputState,
    inputName = "password",
    inputPlaceholder = "",
    labelText,
    minLenght = 0,
    maxLength,
    label = false,
    required = false,
}: {
    onChange: EventHandler<ChangeEvent>;
    inputState: string;
    inputName?: string;
    labelText?: string;
    inputPlaceholder: string;
    minLenght?: number;
    maxLength: number;
    label?: boolean;
    required?: boolean;
}) => {
    return (
        <>
            {label && <label htmlFor={inputName}>{labelText}</label>}
            <input
                type="password"
                name={inputName}
                value={inputState}
                minLength={minLenght}
                maxLength={maxLength}
                onChange={onChange}
                required={required}
                placeholder={inputPlaceholder}
                className={styles["text-input__label"]}
            />
        </>
    );
};
