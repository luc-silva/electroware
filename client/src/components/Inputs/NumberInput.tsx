import { ChangeEvent, EventHandler } from "react";
import styles from "./NumberInput.module.css";

export const NumberInput = ({
    onChange,
    inputName,
    minValue = 0,
    maxValue,
    labelText,
    inputPlaceholder = "",
    inputState,
    label = false,
    required = false,
    stepAny = false,
}: {
    onChange: EventHandler<ChangeEvent>;
    inputName: string;
    minValue?: number;
    maxValue: number;
    labelText?: string;
    inputPlaceholder?: string;
    inputState: number;
    label?: boolean;
    stepAny?: boolean;
    required?: boolean;
}) => {
    return (
        <>
        {label &&
            <label
            htmlFor={inputName}
            className={styles["input-number__label"]}
            >
                {labelText}
            </label>
            }
            <input
                step={stepAny ? "any" : "1"}
                type="number"
                name={inputName}
                min={minValue}
                max={maxValue}
                value={inputState}
                onChange={onChange}
                required={required}
                placeholder={inputPlaceholder}
                className={styles["input-number__input"]}
            />
        </>
    );
};
