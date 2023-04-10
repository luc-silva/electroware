import styles from "./ImageBox.module.css";

export const ImageBox = ({
    isLoading,
    alt = "",
    imgSrc
}: {
    isLoading: boolean;
    imgSrc?: string
    alt?: string;
}) => {
    //let image = require("")
    return (
        <div className={styles["image-container"]}>
            {(isLoading && <div className={styles["loading-thumb"]} />) || (
                <img src={imgSrc} alt={alt} loading={"lazy"} />
            )}
        </div>
    );
};
