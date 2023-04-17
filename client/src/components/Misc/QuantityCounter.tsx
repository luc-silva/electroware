import styles from "./QuantityCounter.module.css";

export const QuantityCounter = ({
    max,
    quantity,
    setQuantity, 
}: {
    max: number;
    quantity: number;
    setQuantity: Function;
}) => {
    function addOne() {
        if (quantity < max) {
            setQuantity((prev: number) => prev + 1);
        }
    }
    function removeOne() {
        if (quantity > 1) {
            setQuantity((prev: number) => prev - 1);
        }
    }

    return (
        <div className={styles["quantity-counter"]}>
            <span onClick={addOne}>+</span>
            <div className={styles["quantity-counter__display"]}>
                {quantity}
            </div>
            <span onClick={removeOne}>-</span>
        </div>
    );
};
