import { useEffect, useState } from "react";
import styles from "./DiscountedProductsDisplay.module.css";
import ProductService from "../../services/ProductService";
import { ProductCard } from "../Cards/ProductCard";

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
                        {products.map(({ _id }: { _id: string }) => {
                            return (
                                <span className={styles["container__item"]}>
                                    <ProductCard id={_id} />
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};