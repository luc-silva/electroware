import { AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import ImageService from "../../services/ImageService";
import { createImage } from "../../utils/operations";
import { ImageBox } from "../Misc/ImageBox";
import styles from "./UserImageInput.module.css";

export const UserImageInput = ({ user }: { user: UserProps }) => {
    let imageInitialValue = null as null | string;

    let [image, setImage] = useState(imageInitialValue);
    let [imageLoading, toggleImageLoading] = useState(true);

    useEffect(() => {
        ImageService.getUserImage(user.id)
            .then(({data}) => {
                setImage(createImage(data));
            })
            .then(() => {
                toggleImageLoading(false);
            });
    }, []);

    async function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let formData = new FormData();

        let files = event.target.files;
        if (event.target && files && files[0] instanceof File) {
            formData.append("imageField", files[0]);
            await ImageService.uploadImage(formData, user.token);
        }
    }

    return (
        <div className={styles["profile-picture"]}>
            <ImageBox isLoading={imageLoading} imgSrc={image} />
            <input
                name="userImage"
                type="file"
                accept="jpeg jpg"
                size={1}
                onChange={handleChange}
            />
        </div>
    );
};
