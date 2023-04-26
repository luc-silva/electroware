import { ChangeEvent, EventHandler } from "react";
import styles from "./ImageInput.module.css";
import { ImageBox } from "../Misc/ImageBox";

export const ImageInput = ({
    imageSrc,
    onChange,
    required = false
}: {
    imageSrc: any;
    onChange: EventHandler<ChangeEvent>;
    required?:boolean
}) => {
    return (
        <>
            <ImageBox isLoading={false} imgSrc={imageSrc} />
            <div className={styles["input-container"]}>
                <input type="file" name="productImage" onChange={onChange} required={required}/>
            </div>
        </>
    );
};
