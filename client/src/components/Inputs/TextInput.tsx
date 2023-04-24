import { ChangeEvent, EventHandler } from "react";
import styles from "./TextInput.module.css";

export const TextInput = ({
    inputName,
    inputText,
    onChange,
    maxLength,
    minLenght = 0,
    required = false,
}: {
    onChange: EventHandler<ChangeEvent>;
    inputName: string;
    inputText: string;
    maxLength: number;
    minLenght?: number;
    required?: boolean;
}) => {
    return (
        <>
            <label htmlFor={inputName} className={styles["text-input__label"]}>
                {inputText}
            </label>
            <input
                type="text"
                name={inputName}
                minLength={minLenght}
                maxLength={maxLength}
                onChange={onChange}
                required={required}
                className={styles["text-input__label"]}
            />
        </>
    );
};
