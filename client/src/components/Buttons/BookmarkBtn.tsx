import { Bookmark } from "phosphor-react";
import styles from "./BookmarkBtn.module.css";

export const BookmarkBtn = ({
    onClick,
}: {
    onClick: React.MouseEventHandler;
}) => {
    return (
        <div onClick={onClick} className={styles["bookmark-btn"]}>
            <Bookmark size={35} />
        </div>
    );
};
