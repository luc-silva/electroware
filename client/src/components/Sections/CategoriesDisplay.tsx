import { useEffect, useState } from "react";
import CategoryService from "../../services/CategoryService";
import { CategoryCard } from "../Cards/CategoryCard";

import styles from "./CategoriesDisplay.module.css";

export const CategoriesDisplay = () => {
    let [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getCategories().then(setCategories);
    }, []);
    return (
        <section className={styles["categories-display"]}>
            <div className={styles["display__title"]}>
                <h2>Categorias</h2>
            </div>
            <div className={styles["display__container"]}>
                {categories.map(
                    (
                        { _id, name }: { _id: string; name: string },
                        index: React.Key
                    ) => {
                        return (
                            <CategoryCard id={_id} name={name} key={index} />
                        );
                    }
                )}
            </div>
        </section>
    );
};
