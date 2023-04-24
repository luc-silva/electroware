import { ChangeEvent, EventHandler } from "react";
import styles from "./TextInput.module.css";

export const TextInput = ({
    onChange,
    initialValue,
    inputName,
    inputText,
    minLenght = 0,
    maxLength,
    required = false,
}: {
    onChange: EventHandler<ChangeEvent>;
    initialValue: string;
    inputName: string;
    inputText: string;
    minLenght?: number;
    maxLength: number;
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
                value={initialValue}
                minLength={minLenght}
                maxLength={maxLength}
                onChange={onChange}
                required={required}
                className={styles["text-input__label"]}
            />
        </>
    );
};
