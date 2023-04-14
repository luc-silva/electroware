import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    imageInitialValue,
    userProfileInitialValues,
} from "../constants/initialStates";

//
import { StarsContainer } from "../components/Misc/StarsContainer";
import UserService from "../services/UserService";
import { createImage, getAverage } from "../utils/operations";

//
import styles from "./UserProfile.module.css";
import { ImageBox } from "../components/Misc/ImageBox";
import ImageService from "../services/ImageService";
import { UserProducts } from "../components/Sections/UserProducts";
import { ReputationDisplay } from "../components/Misc/ReputationDisplay";

export const UserProfile = () => {
    let { id } = useParams();
    let [userImage, setUserImage] = useState(imageInitialValue);
    let [user, setUser] = useState(userProfileInitialValues);
    let [products, setProducts] = useState([]);
    let [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (id) {
            UserService.getUserInfo(id).then((data) => setUser(data));
            UserService.getUserProducts(id).then((data) => setProducts(data));
            UserService.getUserProductsReceivedReviews(id).then((data) =>
                setReviews(data)
            );
        }
    }, [id]);
    useEffect(() => {
        if (id) {
            ImageService.getUserImage(id).then((data) => {
                console.log(data);
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
                <div className={styles["user-profile__details"]}>
                    <div className={styles["user-profile__details__title"]}>
                        <h2>{`${user.name.first} ${user.name.last}`}</h2>
                        <p>{`${user.location.state}, ${user.location.country}`}</p>
                    </div>
                    <ReputationDisplay reviews={reviews} />
                    <div className={styles["user-profile__description"]}>
                        <div className={styles["description__title"]}>
                            <p>Descrição</p>
                            <div>
                                {(user.description && (
                                    <p>{user.description}</p>
                                )) || <em>Nenhuma descrição provida</em>}
                            </div>
                        </div>
                        <div className={styles["description-text"]}></div>
                    </div>
                </div>
            </section>
            <UserProducts products={products} />
        </main>
    );
};
