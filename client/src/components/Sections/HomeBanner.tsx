import styles from "./HomeBanner.module.css"

export const HomeBanner = () => {
    return (
        <section className={styles["active-promos"]}>
            <img
                src={require("../../assets/electroware-banner-1.jpg")}
                alt="homepage banner"
            />
        </section>
    );
};
