import { useState } from "react";
import { ImageBox } from "./ImageBox";
import styles from "./ProfilePicture.module.css";

export const ProfilePicture = ({ round = false }: { round?: boolean }) => {
    let [className, setClassName] = useState(styles["profile-picture"])
    useState(() => {
        if(round){
            let className = [styles["profile-picture"], styles["profile-picture--rounded"]].join(" ")
            setClassName(className)
        } else{
            setClassName(styles["profile-picture"])
        }
    })
    return (
        <>
            <div className={className}>
                <ImageBox isLoading alt="" />
            </div>
        </>
    );
};
