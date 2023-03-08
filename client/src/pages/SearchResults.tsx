import styles from "./SearchResults.module.css";
import { categories } from "../testData";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const SearchResults = () => {
    const { search } = useParams();
    let [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        axios({
            method: "post",
            url: "http://localhost:6060/api/product/search",
            data: {
                name: search,
            },
        }).then((response) => {
            if (response.data) {
                setSearchResults(response.data);
            }
        });
    }, [search]);

    return (
        <main role={"main"} className={styles["search-results"]}>
            <aside className={styles["search-results__panel"]}>
                <section className={styles["filter-container"]} >
                    <h3>Filtros</h3>
                    <p>Ainda em Implementacao</p>
                </section>
                <section className={styles["category-container"]} >
                    <div>
                        <h3>Categorias</h3>
                    </div>
                    <ul>
                        {categories.map((categoria, index: React.Key) => (
                            <li key={index}>{categoria}</li>
                        ))}
                    </ul>
                </section>
            </aside>

            <section className={styles["search-results__main"]}>
                <div className={styles["search-results__main__title"]}>
                    <h2>Resultados da Pesquisa</h2>
                    <p>{searchResults.length} resultados</p>
                </div>
                <div className={styles["results-container"]}>
                    {searchResults.map((product: Product, index: React.Key) => (
                        <div key={index} className={styles["result-product"]}>
                            <Link to={`/product/${product._id}`}>
                                <div className={styles["product-image"]}>
                                    <img src="a" alt="" />
                                </div>
                                <div className={styles["product-details"]}>
                                    <div
                                        className={styles["product-details__main"]}
                                    >
                                        <h3>{product.name}</h3>
                                        <p>Vendido por {product.owner}</p>
                                    </div>
                                    <div
                                        className={styles["product-details__info"]}
                                    >
                                        <strong>{`R$ ${product.price}`}</strong>
                                        <p>{`Reviews: ${product.reviews}`}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};
