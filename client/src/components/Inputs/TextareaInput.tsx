import { ChangeEvent, EventHandler } from "react";
import styles from "./TextareaInput.module.css";

export const TextareaInput = ({
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
            <label
                htmlFor={inputName}
                className={styles["textarea-input__label"]}
            >
                {inputText}
            </label>
            <textarea
                name={inputName}
                value={initialValue}
                minLength={minLenght}
                maxLength={maxLength}
                required={required}
                className={styles["textarea-input__input"]}
                onChange={onChange}
            />
        </>
    );
};
