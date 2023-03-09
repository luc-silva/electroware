import { Star } from "phosphor-react";
import styles from "./StarsContainer.module.css";

export const StarsContainer = ({
    size,
    stars,
}: {
    stars: number;
    size: number;
}) => {
    let starsArr = [
        <Star size={size} color="var(--main-color)" />,
        <Star size={size} color="var(--main-color)" />,
        <Star size={size} color="var(--main-color)" />,
        <Star size={size} color="var(--main-color)" />,
        <Star size={size} color="var(--main-color)" />,
    ];
    return (
        <div className={styles["stars-container"]}>
            {starsArr.map((element, index) => {
                return index >= Math.floor(stars) ? (
                    element
                ) : (
                    <Star
                        size={size}
                        color="var(--main-color)"
                        weight="duotone"
                    />
                );
            })}
        </div>
    );
};
