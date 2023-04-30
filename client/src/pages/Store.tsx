import { HomeRecentProducts } from "../components/Sections/HomeRecentProducts";
import { HomeBanner } from "../components/Sections/HomeBanner";
import { CategoriesDisplay } from "../components/Sections/CategoriesDisplay";

import { Truck, Cube, Gauge, Wallet } from "phosphor-react";
import styles from "./Store.module.css";
import { DiscountedProductsDisplay } from "../components/Displays/DiscountedProductsDisplay";

export const Store = ({
    user,
    setUser,
}: {
    user: IUserSession;
    setUser: Function;
}) => {
    return (
        <main role={"main"} className={styles["index"]}>
            <HomeBanner />
            <section className={styles["featured"]}>
                <div className={styles["featured__title"]}>
                    <h2>Por que você deveria comprar conosco?</h2>
                </div>
                <div className={styles["featured__container"]}>
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
            <div className={styles["on-sale__container"]}>
                <DiscountedProductsDisplay />
            </div>
            <div className={styles["categories__container"]}>
                <CategoriesDisplay />
            </div>
            <div className={styles["recent-products__container"]}>
                <HomeRecentProducts />
            </div>
        </main>
    );
};
