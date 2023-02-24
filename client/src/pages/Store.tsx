import styles from "./Store.module.css";
import { Truck, Cube, Gauge, Wallet } from "phosphor-react";
import { ProductCard } from "../components/ProductCard";

import { productsHomepage } from "../testData";

export const Store = () => {
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
                <ul className={styles["categories-container"]}>
                    {productsHomepage.map(
                        ({
                            productName,
                            productPrice,
                            productUrl,
                            productVendor,
                        }, index: any, number) => {
                            return (
                                <ProductCard
                                    productName={productName}
                                    productUrl={productUrl}
                                    productPrice={productPrice}
                                    productVendor={productVendor}
                                    key={index}
                                />
                            );
                        }
                    )}
                </ul>
            </section>
        </main>
    );
};
