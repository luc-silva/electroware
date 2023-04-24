import { ChangeEvent, EventHandler } from "react";
import styles from "./NumberInput.module.css";

export const NumberInput = ({
    onChange,
    initialValue,
    inputName,
    inputText,
    maxValue,
    minValue = 0,
    required = false,
    stepAny = false,
}: {
    onChange: EventHandler<ChangeEvent>;
    initialValue: number;
    inputName: string;
    inputText: string;
    minValue?: number;
    maxValue: number;
    required?: boolean;
    stepAny?: boolean;
}) => {
    return (
        <>
            <label
                htmlFor={inputName}
                className={styles["input-number__label"]}
            >
                {inputText}
            </label>
            <input
                step={stepAny ? "any" : "1"}
                type="number"
                name={inputName}
                min={minValue}
                max={maxValue}
                value={initialValue}
                onChange={onChange}
                required={required}
                className={styles["input-number__input"]}
            />
        </>
    );
};
