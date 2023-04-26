import { Link, } from "react-router-dom";

import styles from "./Registration.module.css";
import { RegistrationForm } from "../components/Forms/RegistrationForm";

export const Registration = ({ showToast }: { showToast: Function }) => {


    

    return (
        <main role={"main"} className={styles["registration"]}>
            <section className={styles["registration__title"]}>
                <h1>Crie uma conta</h1>
                <p>Não gaste o seu dinheiro em outros sites!</p>
            </section>
            <section className={styles["registration__main"]}>
                <div className={styles["registration__form__container"]}>
                    <RegistrationForm showToast={showToast}/>
                </div>
                <div className={styles["registration__links"]}>
                    <Link to="/login">Já possui uma conta? Entre </Link>
                </div>
            </section>
        </main>
    );
};
