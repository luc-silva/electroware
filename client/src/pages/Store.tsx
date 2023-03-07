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
            .get("http://localhost:6060/api/products")
            .then((response) => setRecentProducts(response.data));
    }, []);
    return (
        <main role={"main"} className={styles["index"]}>
            <div>
                <section className={styles["activepromos"]}>
                    <img src="" alt="" />
                </section>
            </div>
            <section className={styles["featured"]}>
                <div>
                    <h2>Por que você deveria comprar conosco?</h2>
                </div>
                <div className={styles["featured-container"]}>
                    <div className={styles["container-item"]}>
                        Entrega para o mundo inteiro.
                        <Truck size={45} color={"var(--main-color)"} />
                    </div>
                    <div className={styles["container-item"]}>
                        Caixas de alta qualidade.
                        <Cube size={45} color={"var(--main-color)"} />
                    </div>
                    <div className={styles["container-item"]}>
                        Caminhões equipados com motores de última geração.
                        <Gauge size={45} color={"var(--main-color)"} />
                    </div>
                    <div className={styles["container-item"]}>
                        Pagamento mais seguro do universo.
                        <Wallet size={45} color={"var(--main-color)"} />
                    </div>
                </div>
            </section>
            <section className={styles["products"]}>
                <div className={styles["products-container"]}></div>
            </section>
            <section className={styles["recent-products"]}>
                <h2>Recém anunciados</h2>
                {recentProducts.length > 0 ? (
                    <ul className={styles["products-container"]}>
                        {recentProducts.length > 0
                            ? recentProducts.map(
                                  (
                                      { name, price, owner, _id }: Product,
                                      index: any,
                                      number
                                  ) => {
                                      return (
                                          <ProductCard
                                              id={_id}
                                              name={name}
                                              price={price}
                                              key={index}
                                          />
                                      );
                                  }
                              )
                            : ""}
                    </ul>
                ) : (
                    "Nothing to show"
                )}
            </section>
        </main>
    );
};
