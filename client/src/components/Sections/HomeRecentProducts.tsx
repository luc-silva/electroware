import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { ProductCard } from "../Cards/ProductCard";
import styles from "./HomeRecentProducts.module.css"

export const HomeRecentProducts = () => {
    let [recentProducts, setRecentProducts] = useState([]);
    useEffect(() => {
        ProductService.getRecentProducts().then((data) => {
            setRecentProducts(data)
        })
    }, []);
    
    return (
        <section className={styles["recent-products"]}>
            <h2>Recém anunciados</h2>
            {recentProducts.length > 0 ? (
                <ul className={styles["products-container"]}>
                    {recentProducts.length > 0
                        ? recentProducts.map(
                              ({ _id }: IProductDetails, index: React.Key) => {
                                  return <ProductCard id={_id} key={index} />;
                              }
                          )
                        : ""}
                </ul>
            ) : (
                "Sem produtos disponíveis."
            )}
        </section>
    );
};
