import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import styles from "./Wishlist.module.css";
export const Wishlist = ({ user }: { user: UserProps }) => {
    let { id } = useParams();
    const navigate = useNavigate()
    let [products, setProducts] = useState([]);
    useEffect(() => {
        if(!user.logged){
            navigate("/login")
        }
        axios
            .get(`http://localhost:6060/api/wishlist`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then(({ data }) => {
                console.log(data)
                setProducts(data.products);
            });
    }, [id]);
    return (
        <main role="main" className={styles["wishlist"]}>
            <section className={styles["wishlist__main"]}>
                <div className={styles["wishlist__title"]}>
                    <h3>Lista de Desejos</h3>
                </div>
                <div className={styles["products__container"]}>
                    {products.map(
                        ({ _id, name, price }: Product, index: React.Key) => {
                            return (
                                <ProductCard
                                    id={_id}
                                    name={name}
                                    price={price}
                                    key={index}
                                />
                            );
                        }
                    )}
                </div>
            </section>
        </main>
    );
};
