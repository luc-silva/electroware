import { ReputationDisplay } from "../Displays/ReputationDisplay";

import styles from "./ProfileDetails.module.css";

export const ProfileDetails = ({
    user,
    reviews,
}: {
    user: IUserDetails;
    reviews: IReview[];
}) => {
    return (
        <div className={styles["user-profile__details"]}>
            <div className={styles["user-profile__details__title"]}>
                <h2>{`${user.name.first} ${user.name.last}`}</h2>
                <p>{`${user.location.state}, ${user.location.country}`}</p>
            </div>
            <ReputationDisplay reviews={reviews} />
            <div className={styles["user-profile__description"]}>
                <div className={styles["description__title"]}>
                    <p>Descrição</p>
                </div>
                <div className={styles["description-text"]}>
                    {(user.description && <p>{user.description}</p>) || (
                        <em>Nenhuma descrição provida</em>
                    )}
                </div>
            </div>
        </div>
    );
};
