import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { ProductCard } from "../Cards/ProductCard";
import styles from "./DiscountedProductsDisplay.module.css";

export const DiscountedProductsDisplay = () => {
    let [products, setProducts] = useState([]);
    useEffect(() => {
        ProductService.getDiscountedProducts().then((data) => {
            setProducts(data);
        });
    }, []);
    return (
        <>
            {products.length > 0 && (
                <div className={styles["discounted-products"]}>
                    <div className={styles["discounted-products__title"]}>
                        <h2>Produtos em Desconto</h2>
                    </div>
                    <div className={styles["discounted-products__container"]}>
                        {products.map(
                            ({ _id }: { _id: string }, index: React.Key) => {
                                return (
                                    <span
                                        className={styles["container__item"]}
                                        key={index}
                                    >
                                        <ProductCard id={_id} />
                                    </span>
                                );
                            }
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
