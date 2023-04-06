import styles from "./ImageBox.module.css";

export const ImageBox = ({
    isLoading,
    alt = "",
}: {
    isLoading: boolean;
    alt?: string;
}) => {
    //let image = require("")
    return (
        <div className={styles["image-container"]}>
            {(isLoading && <div className={styles["loading-thumb"]} />) || (
                <img src="" alt={alt} loading={"lazy"} />
            )}
        </div>
    );
};
