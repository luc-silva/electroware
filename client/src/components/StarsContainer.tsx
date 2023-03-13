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
        <Star size={size} color="var(--main-color)" key={0} />,
        <Star size={size} color="var(--main-color)" key={1} />,
        <Star size={size} color="var(--main-color)" key={2} />,
        <Star size={size} color="var(--main-color)" key={3} />,
        <Star size={size} color="var(--main-color)" key={4} />,
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
                        key={index}
                    />
                );
            })}
        </div>
    );
};
