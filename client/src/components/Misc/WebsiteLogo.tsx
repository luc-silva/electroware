import { Link } from "react-router-dom";
import styles from "./WebsiteLogo.module.css";

export const WebsiteLogo = () => {
    return (
        <h1 className={styles["header-logo"]}>
            <Link to={"/"}>Electroware</Link>
        </h1>
    );
};
