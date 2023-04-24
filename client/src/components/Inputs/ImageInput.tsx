import { ChangeEvent, EventHandler } from "react";
import styles from "./ImageInput.module.css";
import { ImageBox } from "../Misc/ImageBox";

export const ImageInput = ({
    imageSrc,
    onChange,
}: {
    imageSrc: any;
    onChange: EventHandler<ChangeEvent>;
}) => {
    return (
        <>
            <ImageBox isLoading={false} imgSrc={imageSrc} />
            <div className={styles["input-container"]}>
                <input type="file" name="productImage" onChange={onChange} />
            </div>
        </>
    );
};
