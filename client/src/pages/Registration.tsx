import { Link } from "react-router-dom" 
import styles from "./Registration.module.css"

export const Registration = () => {
  return (
    <div className={styles["registration"]}>
      <div className={styles["registration-text"]}>
        <h1>Create an account</h1>
        <p>Don't waste your money on other marketplaces anymore!</p>
      </div>
      <div className={styles["registration-form"]}>
        <form action="POST">
          <input type="text" placeholder="Your name"/>
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Password" />
          <input type="submit" value="Create an account"/>
        </form>
        <Link to="/login">Already have an account? Sign in </Link>
      </div>
    </div>
  )
}