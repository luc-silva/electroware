import { useNavigate } from "react-router-dom";
import styles from "./CategoryCard.module.css";

export const CategoryCard = ({ _id, name }: { _id: string; name: string }) => {
    const navigate = useNavigate();

    function redirectUser(id: string) {
        navigate(`/category/${id}`);
    }
    return (
        <div
            className={styles["category-card"]}
            onClick={() => {
                redirectUser(_id);
            }}
        >
            <p>{name}</p>
        </div>
    );
};
