import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    imageInitialValue,
    userProfileInitialValues,
} from "../constants/initialStates";

//
import UserService from "../services/UserService";
import ImageService from "../services/ImageService";
import { createImage } from "../utils/operations";
import { UserProducts } from "../components/Sections/UserProducts";
import { ProfileDetails } from "../components/Misc/ProfileDetails";
import { ImageBox } from "../components/Misc/ImageBox";

//
import styles from "./UserProfile.module.css";

export const UserProfile = () => {
    let { id } = useParams();
    let [userImage, setUserImage] = useState(imageInitialValue);
    let [user, setUser] = useState(userProfileInitialValues);
    let [products, setProducts] = useState([]);
    let [reviewsScore, setReviewsScore] = useState([]);

    useEffect(() => {
        if (id) {
            UserService.getUserInfo(id).then((data) => {
                setUser(data);
            });
            UserService.getUserProducts(id).then((data) => {
                setProducts(data);
            });
            UserService.getUserProductsReceivedReviews(id).then((data) => {
                setReviewsScore(data);
            });
        }
    }, [id]);
    useEffect(() => {
        if (id) {
            ImageService.getUserImage(id).then((data) => {
                setUserImage(data.data);
            });
        }
    }, [user]);

    return (
        <main role={"main"} className={styles["user-profile"]}>
            <section className={styles["user-profile__main"]}>
                <div className={styles["user-profile__info"]}>
                    <div className={styles["user-profile__picture"]}>
                        <ImageBox
                            isLoading={false}
                            imgSrc={createImage(userImage)}
                        />
                    </div>
                </div>
                <ProfileDetails user={user} reviews={reviewsScore} />
            </section>
            <UserProducts products={products} />
        </main>
    );
};
