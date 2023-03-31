import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import styles from "./Category.module.css";
export const Category = () => {
    let { id } = useParams();
    let [products, setProducts] = useState([]);
    let [category, setCategory] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:6060/api/category/${id}/products`)
            .then(({ data }) => {
                setProducts(data);
            });
        axios
            .get(`http://localhost:6060/api/category/${id}`)
            .then(({ data }) => {
                setCategory(data.name);
            });
    }, [id]);
    return (
        <main role="main" className={styles["category"]}>
            <section className={styles["category__main"]}>
                <div className={styles["category__products__title"]}>
                    <h2>{category}</h2>
                    <p>
                        {products.length == 1
                            ? `${products.length} produtos disponível!`
                            : `${products.length} produtos disponíveis!`}
                    </p>
                </div>
                <div className={styles["products__container"]}>
                    {products.map(
                        ({ _id, name, price }: Product, index: React.Key) => (
                            <ProductCard id={_id} />
                        )
                    )}
                </div>
            </section>
        </main>
    );
};
