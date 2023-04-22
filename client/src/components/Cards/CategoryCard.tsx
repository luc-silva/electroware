import { useNavigate } from "react-router-dom";
import styles from "./CategoryCard.module.css";

export const CategoryCard = ({ id, name }: { id: string; name: string }) => {
    const navigate = useNavigate();

    function redirectUser(id: string) {
        navigate(`/category/${id}`);
    }
    return (
        <div
            className={styles["category-card"]}
            onClick={() => {
                redirectUser(id);
            }}
        >
            <p>{name}</p>
        </div>
    );
};
