import axios from "axios";
import { FormEvent, useState } from "react";
import ReviewService from "../../services/ReviewService";
import { SubmitBtn } from "../Buttons/SubmitBtn";

import styles from "./ReviewForm.module.css";

export const ReviewForm = ({
    user,
    product,
    updateReviews,
}: {
    updateReviews: Function;
    user: UserProps;
    product: Product;
}) => {
    let [reviewForm, setReviewForm] = useState({ text: "", score: 1 });
    function handleReviewInputs(event: FormEvent<HTMLFormElement>) {
        let target = event.target;
        if (
            target instanceof HTMLSelectElement ||
            target instanceof HTMLTextAreaElement
        ) {
            setReviewForm({ ...reviewForm, [target.name]: target.value });
        }
    }

    function handleReviewSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let data = {
            author: user.id,
            authorUsername: user.username,
            product: product._id,
            productOwner: product.owner,
            text: reviewForm.text,
            score: reviewForm.score,
        };
        ReviewService.submitReview(data, user.token).then(() => {
            updateReviews();
        });
    }

    if (!user.logged || user.id === product.owner) return null;
    return (
        <div className={styles["ratings__form"]}>
            <form
                action="POST"
                onSubmit={handleReviewSubmit}
                onChange={handleReviewInputs}
            >
                <textarea name="text" defaultValue={reviewForm.text} />
                <div>
                    <label htmlFor="score">
                        <p>Nota:</p>
                        <select name="score" value={reviewForm.score}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </label>
                    <SubmitBtn textValue="Enviar" />
                </div>
            </form>
        </div>
    );
};
