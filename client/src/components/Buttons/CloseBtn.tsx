import { X } from "phosphor-react";

import styles from "./CloseBtn.module.css";

export const CloseBtn = ({ onClick }: { onClick: React.MouseEventHandler }) => {
    return (
        <div className={styles["close-btn"]}>
            <X size={25} onClick={onClick} />
        </div>
    );
};
