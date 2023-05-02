import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductCard } from "../components/Cards/ProductCard";
import UserService from "../services/UserService";
import styles from "./Wishlist.module.css";
import { CollectionContainer } from "../components/Containers/CollectionContainer";

export const Wishlist = ({
    user,
    showToast,
}: {
    user: IUserSession;
    showToast: Function;
}) => {
    let [collections, setCollections] = useState([]);
    let { id } = useParams();
    const navigate = useNavigate();

    async function updateCollections() {
        UserService.getUserCollections(user.id, user.token).then((data) => {
            setCollections(data);
        });
    }
    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }

        updateCollections();
    }, [id]);

    return (
        <main role="main" className={styles["wishlist"]}>
            <section className={styles["wishlist__main"]}>
                <div className={styles["wishlist__title"]}>
                    <h2>Lista de Desejos</h2>
                </div>
                <div className={styles["products__container"]}>
                    {(collections.length > 0 &&
                        collections.map(
                            (item: IWishlistCollection, index: React.Key) => {
                                return (
                                    <CollectionContainer
                                        data={item}
                                        user={user}
                                        key={index}
                                        showToast={showToast}
                                        updateCollections={updateCollections}
                                    />
                                );
                            }
                        )) || <p>Sem Produtos Disponíveis</p>}
                </div>
            </section>
        </main>
    );
};
