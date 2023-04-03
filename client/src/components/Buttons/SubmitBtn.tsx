import styles from "./SubmitBtn.module.css";

export const SubmitBtn = ({
    textValue,
    disabled = false,
}: {
    textValue: string;
    disabled?: boolean;
}) => {
    return (
        <input
            className={styles["submit-btn"]}
            type="submit"
            value={textValue}
            disabled={disabled}
        />
    );
};
