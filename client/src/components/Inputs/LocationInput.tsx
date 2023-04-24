import { ChangeEvent, EventHandler } from "react";
import styles from "./LocationInput.module.css";
export const LocationInput = ({
    locationCountry,
    locationState,
    onChange
}: {
    locationState: string;
    locationCountry: string;
    onChange: EventHandler<ChangeEvent>

}) => {
    return (
        <>
            <div className={styles["input__container"]}>
                <label htmlFor="state">Estado</label>
                <input
                    type="text"
                    name="state"
                    maxLength={200}
                    value={locationState}
                    onChange={onChange}

                />
            </div>
            <div className={styles["input__container"]}>
                <label htmlFor="country">País</label>
                <input
                    type="text"
                    name="country"
                    maxLength={200}
                    value={locationCountry}
                    onChange={onChange}
                />
            </div>
        </>
    );
};
