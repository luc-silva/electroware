import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ReviewCard.module.css";

export const ReviewCard = ({
    score,
    text,
    author,
    createdAt,
    authorUsername,
}: Review) => {
    return (
        <div className={styles["rating-card"]}>
            <div className={styles["card-userinfo"]}>
                <div className={styles["user-photo"]}>
                    {/* <img src="" alt="" /> */}
                </div>
                <div>
                    Rating:
                    {score}
                </div>
            </div>
            <div className={styles["user-review"]}>
                <div className={styles["review-detail"]}>
                    <Link to={`/user/${author}`}>
                        <strong>{authorUsername || "Anonymous"}</strong>
                    </Link>
                    <p>{format(new Date(createdAt), "dd/MM/yyyy")}</p>
                </div>
                <div className={styles["user-review-text"]}>
                    {text || <em>Nenhum detalhe provido</em>}
                </div>
            </div>
        </div>
    );
};
