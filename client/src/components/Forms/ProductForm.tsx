import {
    ChangeEvent,
    FormEvent,
    FormEventHandler,
    useEffect,
    useState,
} from "react";
import CategoryService from "../../services/CategoryService";
import { SubmitBtn } from "../Buttons/SubmitBtn";
import styles from "./ProductForm.module.css";
import { SelectInput } from "../Inputs/SelectInput";
import { TextareaInput } from "../Inputs/TextareaInput";
import { TextInput } from "../Inputs/TextInput";
import { NumberInput } from "../Inputs/NumberInput";
import { createrOfferFormInitialValue } from "../../constants/initialStates";

interface FormDataTypes {
    description: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    quantity: number;
}

export const ProductForm = ({
    user,
    form = createrOfferFormInitialValue,
    method,
    setForm,
    handleSubmit,
    submitBtnText,
}: {
    user: UserProps;
    form?: FormDataTypes;
    method: "POST" | "PUT";
    setForm: Function;
    handleSubmit: FormEventHandler<HTMLFormElement>;
    submitBtnText: string;
}) => {
    let [categories, setCategories] = useState([{ name: "", _id: "" }]);
    useEffect(() => {
        CategoryService.getCategories().then((data) => {
            setCategories(data);
        });
    }, []);

    function handleChange(event: ChangeEvent<HTMLElement>) {
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
        <form action={method} onSubmit={handleSubmit}>
            <div className={styles["input-container"]}>
                <TextInput
                    initialValue={form.name}
                    inputName="name"
                    inputText="Produto"
                    maxLength={30}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles["larger-input-container"]}>
                <div className={styles["input-container"]}>
                    <NumberInput
                        initialValue={form.price}
                        inputName="price"
                        inputText="Preço"
                        minValue={1}
                        maxValue={10000}
                        required
                        onChange={handleChange}
                        stepAny
                    />
                </div>
                <div className={styles["input-container"]}>
                    <NumberInput
                        initialValue={form.quantity}
                        inputName="quantity"
                        inputText="Unidades"
                        maxValue={300}
                        minValue={0}
                        required
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles["larger-input-container"]}>
                <div className={styles["input-container"]}>
                    <TextInput
                        initialValue={form.brand}
                        inputName="brand"
                        inputText="Marca"
                        maxLength={15}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles["input-container"]}>
                    <SelectInput
                        initialValue={form.category}
                        arrayOfOptions={categories}
                        inputName="category"
                        inputText="Categoria"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles["input-container"]}>
                <TextareaInput
                    initialValue={form.description}
                    inputName="description"
                    inputText="Descrição"
                    maxLength={200}
                    onChange={handleChange}
                />
            </div>
            <div>
                <SubmitBtn textValue={submitBtnText} />
            </div>
        </form>
    );
};
