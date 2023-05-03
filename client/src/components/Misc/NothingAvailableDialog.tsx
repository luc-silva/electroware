import styles from "./NothingAvailableDialog.module.css";

export const NothingAvailableDialog = ({ text }: { text: string }) => {
    return <p className={styles["dialog"]}>{text}</p>;
};
