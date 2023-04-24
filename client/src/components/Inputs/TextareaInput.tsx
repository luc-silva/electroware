import { ChangeEvent, EventHandler } from "react";
import styles from "./TextareaInput.module.css";

export const TextareaInput = ({
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
            <label
                htmlFor={inputName}
                className={styles["textarea-input__label"]}
            >
                {inputText}
            </label>
            <textarea
                name={inputName}
                minLength={minLenght}
                maxLength={maxLength}
                required={required}
                className={styles["textarea-input__input"]}
            />
        </>
    );
};
