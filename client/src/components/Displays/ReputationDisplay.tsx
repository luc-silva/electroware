import { getAverage } from "../../utils/operations";
import { StarsContainer } from "../Containers/StarsContainer";
import styles from "./ReputationDisplay.module.css";

export const ReputationDisplay = ({ reviews }: { reviews: IReview[] }) => {
    return (
        <div className={styles["user-profile__details__reputation"]}>
            <p>Reputação</p>
            <div>
                <strong>{getAverage(reviews)}</strong>
                <div>
                    <StarsContainer size={20} stars={getAverage(reviews)} />
                </div>
            </div>
        </div>
    );
};
