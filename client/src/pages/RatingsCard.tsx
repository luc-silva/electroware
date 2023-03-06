import { Star } from "phosphor-react";
import styles from "./RatingCard.module.css"

export const RatingCard = () => {
    return (
        <div className={styles["rating-card"]}>
            <div>
                <div className={styles["profile-pic"]}></div>
                <div>
                    5 <Star />
                </div>
            </div>
            <div>
                <div>
                    <h3>Lucas da Silva Santos</h3>
                    <p>Cliente ha anos</p>
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur deserunt sit fugit! Maxime alias sit laboriosam
                    incidunt eos in ullam hic accusantium magni natus iste
                    blanditiis, mollitia temporibus quis molestias?
                </div>
            </div>
        </div>
    );
};
