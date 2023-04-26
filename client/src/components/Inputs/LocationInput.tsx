import { ChangeEvent, EventHandler } from "react";
import styles from "./LocationInput.module.css";
export const LocationInput = ({
    labels = true,
    placeholders = false,
    locationCountry,
    locationState,
    onChange,
}: {
    labels?: boolean;
    placeholders?: boolean;
    locationState: string;
    locationCountry: string;
    onChange: EventHandler<ChangeEvent>;
}) => {
    return (
        <>
            <div className={styles["input__container"]}>
                {labels && <label htmlFor="state">Estado</label>}
                <input
                    placeholder={placeholders ? "Estado" : undefined}
                    type="text"
                    name="state"
                    maxLength={200}
                    value={locationState}
                    onChange={onChange}
                    required
                />
            </div>
            <div className={styles["input__container"]}>
                {labels && <label htmlFor="country">País</label>}
                <input
                    placeholder={placeholders ? "País" : undefined}
                    type="text"
                    name="country"
                    maxLength={200}
                    value={locationCountry}
                    onChange={onChange}
                    required
                />
            </div>
        </>
    );
};
