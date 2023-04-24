import { ChangeEvent, EventHandler } from "react";
import styles from "./NumberInput.module.css";

export const NumberInput = ({
    inputName,
    inputText,
    onChange,
    maxValue,
    minValue = 0,
    required = false,
    stepAny = false,
}: {
    onChange: EventHandler<ChangeEvent>;
    inputName: string;
    inputText: string;
    maxValue: number;
    minValue?: number;
    required?: boolean;
    stepAny?: boolean;
}) => {
    return (
        <>
            <label htmlFor={inputName} 
            className={styles["input-number__label"]}>{inputText}</label>
            <input
                step={stepAny ? "any" : "1"}
                type="number"
                name={inputName}
                min={minValue}
                max={maxValue}
                onChange={onChange}
                required={required}
                className={styles["input-number__input"]}
            />
        </>
    );
};
