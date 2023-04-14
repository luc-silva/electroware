import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductCard } from "../components/Cards/ProductCard";
import WishlistService from "../services/WishlistService";
import styles from "./Wishlist.module.css";

export const Wishlist = ({ user }: { user: UserProps }) => {
    let { id } = useParams();
    let [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }

        WishlistService.getWishlistItems(user.token).then((data) => {
            console.log(data)
            setProducts(data);
        });
    }, [id]);

    return (
        <main role="main" className={styles["wishlist"]}>
            <section className={styles["wishlist__main"]}>
                <div className={styles["wishlist__title"]}>
                    <h2>Lista de Desejos</h2>
                </div>
                <div className={styles["products__container"]}>
                    {products.length !== 0 ? (
                        products.map(
                            ({ product }: WishlistItem, index: React.Key) => {
                                return <ProductCard id={product} key={index} />;
                            }
                        )
                    ) : (
                        <p>Sem Produtos Disponíveis</p>
                    )}
                </div>
            </section>
        </main>
    );
};
