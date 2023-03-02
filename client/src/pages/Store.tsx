import styles from "./Store.module.css";
import { Truck, Cube, Gauge, Wallet } from "phosphor-react";
import { ProductCard } from "../components/ProductCard";

import { productsHomepage } from "../testData";
import { useEffect, useState } from "react";
import axios from "axios";

export const Store = () => {
    let [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:6060/api/product/products")
            .then((response) => setRecentProducts(response.data));
    }, []);

    return (
        <main role={"main"} className={styles["index"]}>
            <div>
                <section className={styles["activepromos"]}></section>
            </div>
            <section className={styles["featured"]}>
                <h2>Why should you buy with us?</h2>
                <div className={styles["featured-container"]}>
                    <div className={styles["container-item"]}>
                        Shipping for the whole world.
                        <Truck size={45} color={"var(--main-color)"} />
                    </div>
                    <div className={styles["container-item"]}>
                        High quality boxes.
                        <Cube size={45} color={"var(--main-color)"} />
                    </div>
                    <div className={styles["container-item"]}>
                        Trucks equipped with high-end engines.
                        <Gauge size={45} color={"var(--main-color)"} />
                    </div>
                    <div className={styles["container-item"]}>
                        Safest payment methods available in the universe.
                        <Wallet size={45} color={"var(--main-color)"} />
                    </div>
                </div>
            </section>
            <section className={styles["products"]}>
                <div className={styles["products-container"]}></div>
            </section>
            <section className={styles["categories"]}>
                <h2>Recent products</h2>
                {recentProducts.length > 0 ? <ul className={styles["categories-container"]}>
                    {recentProducts.length > 0
                        ? recentProducts.map(
                              ({ name, price, owner }, index: any, number) => {
                                  return (
                                      <ProductCard
                                          name={name}
                                          price={price}
                                          key={index}
                                      />
                                  );
                              }
                          )
                        : ""}
                </ul>:"Nothing to show"}
            </section>
        </main>
    );
};
