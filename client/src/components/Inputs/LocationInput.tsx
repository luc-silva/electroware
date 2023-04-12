import styles from "./LocationInput.module.css";
export const LocationInput = ({
    locationCountry,
    locationState,
}: {
    locationState: string;
    locationCountry: string;
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
                />
            </div>
            <div className={styles["input__container"]}>
                <label htmlFor="country">País</label>
                <input
                    type="text"
                    name="country"
                    maxLength={200}
                    value={locationCountry}
                />
            </div>
        </>
    );
};
