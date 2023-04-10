import styles from "./ImageBox.module.css";

export const ImageBox = ({
    isLoading,
    alt = "",
    imgSrc,
}: {
    isLoading: boolean;
    imgSrc?: string | null;
    alt?: string;
}) => {
    //let image = require("")
    return (
        <div className={styles["image-container"]}>
            {(isLoading && <div className={styles["loading-thumb"]} />) ||
                (imgSrc && <img src={imgSrc} alt={alt} loading={"lazy"} />)}
        </div>
    );
};
