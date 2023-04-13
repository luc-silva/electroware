import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import CategoryService from "../../services/CategoryService";
import { SubmitBtn } from "../Buttons/SubmitBtn";
import styles from "./CreateOfferForm.module.css";

interface FormDataTypes {
    description: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    quantity: number;
}

export const CreateOfferForm = ({
    user,
    form,
    setForm,
    handleSubmit,
}: {
    user: UserProps;
    form: FormDataTypes;
    setForm: Function;
    handleSubmit: FormEventHandler<HTMLFormElement>;
}) => {
    let [categories, setCategories] = useState([{ name: "", _id: "" }]);
    useEffect(() => {
        CategoryService.getCategories().then((data) => {
            setCategories(data);
        });
    }, []);

    function handleForm(event: FormEvent<HTMLFormElement>) {
        let target = event.target;
        if (
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement ||
            target instanceof HTMLSelectElement
        ) {
            setForm({ ...form, [target.name]: target.value });
        }
    }

    return (
        <form action="POST" onChange={handleForm} onSubmit={handleSubmit}>
            <div className={styles["input-container"]}>
                <label htmlFor="name">Produto</label>
                <input type="text" name="name" maxLength={30} required />
            </div>
            <div className={styles["larger-input-container"]}>
                <div className={styles["input-container"]}>
                    <label htmlFor="price">Preco</label>
                    <input
                        type="number"
                        name="price"
                        step="any"
                        min={1}
                        max={10000}
                        required
                    />
                </div>
                <div className={styles["input-container"]}>
                    <label htmlFor="quantity">Unidades</label>
                    <input
                        type="number"
                        name="quantity"
                        required
                        min={1}
                        max={300}
                    />
                </div>
            </div>
            <div className={styles["larger-input-container"]}>
                <div className={styles["input-container"]}>
                    <label htmlFor="brand">Marca</label>
                    <input type="text" name="brand" required maxLength={15} />
                </div>
                <div className={styles["input-container"]}>
                    <label htmlFor="category">Categoria</label>
                    <select name="category" required>
                        <option selected value="">
                            -----
                        </option>
                        {categories.map(({ name, _id }) => {
                            return <option value={_id}>{name}</option>;
                        })}
                    </select>
                </div>
            </div>
            <div className={styles["input-container"]}>
                <label htmlFor="description">Descreva o seu produto</label>
                <textarea name="description" maxLength={200} />
            </div>
            <div>
                <SubmitBtn textValue="Anunciar" />
            </div>
        </form>
    );
};
