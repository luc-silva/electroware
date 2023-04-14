import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userProfileInitialValues } from "../constants/initialStates";

//
import { StarsContainer } from "../components/Misc/StarsContainer";
import UserService from "../services/UserService";
import { getAverage } from "../utils/operations";

//
import styles from "./UserProfile.module.css";

export const UserProfile = () => {
    let { id } = useParams();
    let [user, setUser] = useState(userProfileInitialValues);
    let [products, setProducts] = useState([]);
    let [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (id) {
            UserService.getUserInfo(id).then((data) => setUser(data));
            UserService.getUserProducts(id).then((data) => setProducts(data));
            UserService.getUserProductsReviews(id).then((data) =>
                setReviews(data)
            );
        }
    }, [id]);

    return (
        <main role={"main"} className={styles["user-profile"]}>
            <section className={styles["user-profile__main"]}>
                <div className={styles["user-profile__info"]}>
                    <div className={styles["user-profile__picture"]}>
                        <img src="" alt="" />
                    </div>
                </div>
                <div className={styles["user-profile__details"]}>
                    <div className={styles["user-profile__details__title"]}>
                        <h2>{`${user.name.first} ${user.name.last}`}</h2>
                        <p>{`${user.location.state}, ${user.location.country}`}</p>
                    </div>
                    <div
                        className={styles["user-profile__details__reputation"]}
                    >
                        <p>Reputação</p>
                        <div>
                            <strong>{getAverage(reviews)}</strong>
                            <div>
                                <StarsContainer
                                    size={20}
                                    stars={getAverage(reviews)}
                                />
                            </div>
                        </div>
                    </div>
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
            <section className={styles["user-profile__products"]}>
                <div className={styles["user-profile__products__title"]}>
                    <h2>Produtos a venda</h2>
                </div>
                <div className={styles["user-profile__products__container"]}>
                    {products.map(({ name, _id, price }) => {
                        return (
                            <Link to={`/product/${_id}`}>
                                <div
                                    className={
                                        styles["user-profile__product__item"]
                                    }
                                >
                                    <div className={styles["product__picture"]}>
                                        <img src="" alt="" />
                                    </div>
                                    <div className={styles["product__main"]}>
                                        <p>{name}</p>
                                        <strong>{`${price} R$`}</strong>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
};
