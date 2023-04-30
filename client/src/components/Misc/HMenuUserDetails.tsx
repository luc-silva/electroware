import { useEffect, useState } from "react";
import { imageInitialValue } from "../../constants/initialStates";
import ImageService from "../../services/ImageService";
import { createImage } from "../../utils/operations";
import styles from "./HMenuUserDetails.module.css";
import { ImageBox } from "./ImageBox";

export const HMenuUserDetails = ({ user }: { user: IUserSession }) => {
    let [userImage, setUserImage] = useState(imageInitialValue);
    let [isLoading, toggleLoading] = useState(true);
    useEffect(() => {
        if (user.id) {
            ImageService.getUserImage(user.id)
                .then(({ data }) => {
                    setUserImage(data);
                })
                .then(() => {
                    toggleLoading(false);
                });
        }
    }, []);
    return (
        <>
            <div className={styles["hmenu__user-picture"]}>
                <ImageBox
                    isLoading={isLoading}
                    imgSrc={createImage(userImage)}
                />
            </div>
            <div className={styles["hmenu__user-info"]}>
                <strong>{user.username}</strong>
                <p>{user.funds} R$</p>
            </div>
        </>
    );
};
