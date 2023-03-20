import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReviewForm.module.css";

export const ReviewForm = ({
    user,
    product,
    update,
}: {
    user: UserProps;
    product: Product;
    update: Function;
}) => {
    let [reviewForm, setReviewForm] = useState({ text: "", score: 1 });
    let navigate = useNavigate();
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
        axios.post(
            `http://localhost:6060/api/review/`,
            {
                author: user.id,
                authorUsername: user.username,
                product: product._id,
                productOwner: product.owner,
                text: reviewForm.text,
                score: reviewForm.score,
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
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
                    <input type="submit" value={"Publicar"} />
                </div>
            </form>
        </div>
    );
};
