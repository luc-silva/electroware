import styles from "./SearchResults.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchResultItem } from "../components/SearchResultItem";
import ProductService from "../services/ProductService";
import CategoryService from "../services/CategoryService";

export const SearchResults = () => {
    let { search } = useParams();
    let [searchResults, setSearchResults] = useState([]);
    let [categories, setCategories] = useState([]);
    
    useEffect(() => {
        if (search) {
            ProductService.searchProduct(search).then((data) => {
                setSearchResults(data);
            });
            CategoryService.getCategories().then((data) => {
                setCategories(data);
            });
        }
    }, [search]);

    return (
        <main role={"main"} className={styles["search-results"]}>
            <aside className={styles["search-results__panel"]}>
                {/* <section className={styles["filter-container"]} >
                    <h3>Filtros</h3>
                    <p>Ainda em Implementação</p>
                </section> */}
                <section className={styles["category-container"]}>
                    <div>
                        <h3>Categorias</h3>
                    </div>
                    <ul>
                        {categories.map(
                            (
                                { name, _id }: { name: string; _id: string },
                                index: React.Key
                            ) => (
                                <li key={index}>
                                    <Link to={`/category/${_id}`}>{name}</Link>
                                </li>
                            )
                        )}
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
                        <SearchResultItem product={product} key={index} />
                    ))}
                </div>
            </section>
        </main>
    );
};
