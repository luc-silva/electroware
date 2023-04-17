import styles from "./SearchResults.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchResultItem } from "../components/Cards/SearchResultCard";
import ProductService from "../services/ProductService";
import CategoryService from "../services/CategoryService";
import { CategoriesPanel } from "../components/Misc/CategoriesPanel";

export const SearchResults = () => {
    let { search } = useParams();
    let [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (search) {
            ProductService.searchProduct(search).then((data) => {
                setSearchResults(data);
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
                <div className={styles["categories-container"]}>
                    <CategoriesPanel />
                </div>
            </aside>

            <section className={styles["search-results__main"]}>
                <div className={styles["search-results__main__title"]}>
                    <h2>Resultados da Pesquisa</h2>
                    <p>{searchResults.length} resultados</p>
                </div>
                <div className={styles["results-container"]}>
                    {searchResults.length === 0 ? (
                        <strong>Nenhum produto encontrado.</strong>
                    ) : (
                        searchResults.map((id: string, index: React.Key) => (
                            <SearchResultItem productId={id} key={index} />
                        ))
                    )}
                </div>
            </section>
        </main>
    );
};
