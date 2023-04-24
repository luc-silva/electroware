import { ChangeEvent, EventHandler } from "react";
import styles from "./SelectInput.module.css";

interface SelectData {
    name: string;
    _id: string;
}
export const SelectInput = ({
    arrayOfOptions,
    onChange,
    inputName,
    inputText,
}: {
    arrayOfOptions: SelectData[];
    onChange: EventHandler<ChangeEvent>;
    inputName: string;
    inputText: string;
}) => {
    return (
        <>
            <label
                htmlFor={inputName}
                className={styles["select-input__label"]}
            >
                {inputText}
            </label>
            <select
                name={inputName}
                required
                onChange={onChange}
                className={styles["select-input__input"]}
            >
                <option selected value="">
                    -----
                </option>
                {arrayOfOptions.map(({ name, _id }) => {
                    return <option value={_id}>{name}</option>;
                })}
            </select>
        </>
    );
};
