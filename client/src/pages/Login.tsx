import { Link } from "react-router-dom";
import { LoginForm } from "../components/Forms/LoginForm";
import styles from "./Login.module.css";

export const Login = ({
    user,
    setUser,
    showToast,
}: {
    user: IUserSession;
    setUser: Function;
    showToast: Function;
}) => {
    return (
        <main className={styles["login"]}>
            <div className={styles["login-text"]}>
                <h1>Login</h1>
                <p>Entre em sua conta e comece a gastar o seu dinheiro!</p>
            </div>
            <section className={styles["login__main"]}>
                <div className={styles["form__container"]}>
                    <LoginForm setUser={setUser} showToast={showToast} />
                </div>
                <div  className={styles["login__main__links"]}>
                    <Link to="/registration">Crie uma conta</Link>
                </div>
            </section>
        </main>
    );
};
