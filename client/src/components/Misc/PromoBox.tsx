import { Check } from "phosphor-react";
import styles from "./PromoBox.module.css";
import { ChangeEvent } from "react";

export const PromoBox = ({
    form,
    setForm,
}: {
    form: IProductForm;
    setForm: Function;
}) => {
    function toggleSale() {
        setForm({ ...form, on_sale: !form.on_sale });
    }
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let target = event.target;
        if (target) {
            setForm({ ...form, [target.name]: target.value });
        }
    }

    return (
        <div className={styles["promo-box"]}>
            <div className={styles["promo-box__main"]}>
                <div className={styles["promo-box__checkbox"]}>
                    <p>Ativar Promoção:</p>
                    <div className={styles["checkbox"]} onClick={toggleSale}>
                        {form.on_sale && <Check size={20} />}
                    </div>
                </div>
                <div className={styles["promo-box__discount"]}>
                    <label htmlFor="discount">Desconto %:</label>
                    <input
                        name="discount"
                        type="number"
                        min={0}
                        max={80}
                        placeholder="0"
                        value={form.discount}
                        onChange={handleChange}
                        disabled={form.on_sale ? false : true}
                    />
                </div>
            </div>
        </div>
    );
};
