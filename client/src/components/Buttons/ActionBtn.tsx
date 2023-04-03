import React from "react";
import styles from "./ActionBtn.module.css";

interface ActionBtn {
    textValue: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

export const ActionBtn = ({
    onClick,
    textValue,
    disabled = false,
}: ActionBtn) => {
    return (
        <button onClick={onClick} disabled={disabled} className={styles["action-btn"]}>
            {textValue}
        </button>
    );
};
