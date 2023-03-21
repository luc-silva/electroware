import axios from "axios";
import { Star } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { ProductCardSmall } from "../components/ProductCardSmall";
import { StarsContainer } from "../components/StarsContainer";
import styles from "./UserProfile.module.css";

export const UserProfile = () => {
    let { id } = useParams();
    let [user, setUser] = useState({
        name: {
            first: "",
            last: "",
        },
        location: {
            state:"",
            country:"",
        },
        email: "",
        createdAt: new Date(),
        description: "",
    });
    let [products, setProducts] = useState([]);
    let [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:6060/api/user/${id}`)
            .then(({ data }) => setUser(data));
        axios
            .get(`http://localhost:6060/api/user/${id}/products`)
            .then(({ data }) => setProducts(data));
        axios
            .get(`http://localhost:6060/api/user/${id}/products/reviews`)
            .then(({ data }) => setReviews(data));
    }, [id]);

    function setUserReputation() {
        if (reviews.length === 0) return 0;
        let total = 0;
        reviews.forEach(({ score }) => {
            total += score;
        });
        return Number((total / reviews.length).toFixed(1));
    }
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
                            <strong>{setUserReputation()}</strong>
                            <div>
                                <StarsContainer
                                    size={20}
                                    stars={setUserReputation()}
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
