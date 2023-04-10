import { useEffect, useState } from "react";
import ImageService from "../../services/ImageService";
import { ImageBox } from "../Misc/ImageBox";
import styles from "./ImageInput.module.css";

export const ImageInput = ({ user }: { user: UserProps }) => {
    let imageInitialValue = null as null | string;

    let [image, setImage] = useState(imageInitialValue);
    let [imageLoading, toggleImageLoading] = useState(true)

    useEffect(() => {
        ImageService.getUserImage(user.id).then(({ data }) => {
            let blob = new Blob([new Uint8Array(data)], { type: "image/jpeg" });
            let srcBlob = URL.createObjectURL(blob);
            setImage(srcBlob);
        }).then(() => {
            toggleImageLoading(false)
        });
    }, []);
    
    return (
        <>
            <div className={styles["profile-picture"]}>
                {image && <ImageBox isLoading={imageLoading} imgSrc={image} /> }
            </div>
            <input name="imageFile" type="file" accept="jpeg jpg" size={1} />
        </>
    );
};
