import { Link } from "react-router-dom"
import styles from "./Login.module.css"

export const Login = () => {
  return (
    <div className={styles["login"]}>
      <div className={styles["login-text"]}>
        <h1>Login</h1>
        <p>Log in to your account and start spending your money!</p>
      </div>
      <div className={styles["login-form"]}>
        <form action="POST">
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Password" />
          <input type="submit" value="Log In"/>
        </form>
        <Link to="/register">Create an account</Link>
      </div>
    </div>
  )
}