import { useEffect, useState } from "react";
import styles from "./CollectionCard.module.css";

export const CollectionCard = ({
    data,
    setChosenCollection,
    selectedCollection,
}: {
    data: { _id: string; name: string };
    selectedCollection: string;
    setChosenCollection: Function;
}) => {
    let [actualClass, setActualClass] = useState(styles["collection-card"]);

    useEffect(() => {
        if (selectedCollection === data._id) {
            setActualClass(styles["collection-card--active"]);
        } else {
            setActualClass(styles["collection-card"]);
        }
    }, [selectedCollection]);
    return (
        <div
            onClick={() => {
                setChosenCollection(data._id);
            }}
            className={actualClass}
        >
            <strong>{data.name}</strong>
        </div>
    );
};
