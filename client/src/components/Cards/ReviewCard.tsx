import { format } from "date-fns";
import { Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    imageInitialValue,
    reviewsInitialState,
} from "../../constants/initialStates";

import ImageService from "../../services/ImageService";
import ReviewService from "../../services/ReviewService";
import { createImage } from "../../utils/operations";
import { ImageBox } from "../Misc/ImageBox";
import { StarsContainer } from "../Containers/StarsContainer";

import styles from "./ReviewCard.module.css";
import picture from "../../assets/images/missing-profile-picture.jpg";

export const ReviewCard = ({
    reviewId,
    user,
    updateReviews,
}: {
    reviewId: string;
    user: IUserSession;
    updateReviews: Function;
}) => {
    let [cardInfo, setCardInfo] = useState(reviewsInitialState);
    let [userImage, setUserImage] = useState(imageInitialValue);
    let [isLoading, toggleLoading] = useState(true);

    useEffect(() => {
        if (reviewId) {
            ReviewService.getReview(reviewId).then(setCardInfo);
        }
    }, [reviewId]);
    useEffect(() => {
        if (cardInfo.author._id) {
            ImageService.getUserImage(cardInfo.author._id)
                .then(({ data }) => {
                    setUserImage(data);
                })
                .catch(() => {
                    setUserImage("");
                })
                .finally(() => {
                    toggleLoading(false);
                });
        }
    }, [cardInfo.author._id]);

    async function handleDelete() {
        ReviewService.deleteReview(cardInfo._id, user.token).then(() => {
            updateReviews();
        });
    }

    function setImageSource() {
        return userImage ? createImage(userImage) : picture;
    }

    return (
        <div className={styles["rating-card"]}>
            <div className={styles["card-userinfo"]}>
                <div className={styles["user-photo"]}>
                    <ImageBox isLoading={isLoading} imgSrc={setImageSource()} />
                </div>
            </div>
            <div className={styles["user-review"]}>
                <div className={styles["review-detail"]}>
                    <div className={styles["review-author"]}>
                        {(isLoading && (
                            <div className={styles["loading-line"]} />
                        )) || (
                            <Link to={`/user/${cardInfo.author._id}`}>
                                <strong>{`${cardInfo.author.name.first} ${cardInfo.author.name.last}`}</strong>
                            </Link>
                        )}
                    </div>
                    <div className={styles["date-display"]}>
                        {(isLoading && (
                            <div className={styles["loading-line"]} />
                        )) || (
                            <p>
                                {format(
                                    new Date(cardInfo.createdAt),
                                    "dd/MM/yyyy"
                                )}
                            </p>
                        )}
                    </div>
                </div>
                <div className={styles["review-text"]}>
                    {(isLoading && (
                        <div className={styles["loading-line"]} />
                    )) ||
                        cardInfo.text || <em>Nenhum detalhe provido</em>}
                </div>
                <div className={styles["review-panel"]}>
                    <StarsContainer stars={cardInfo.score} size={20} />
                    {user && user.id === cardInfo.author._id && (
                        <button onClick={handleDelete}>
                            <Trash size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
