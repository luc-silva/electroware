import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitBtn } from "../components/Buttons/SubmitBtn";
import styles from "./CreateOffer.module.css";

import ShoppingCartService from "../services/ShoppingCartService";
import CategoryService from "../services/CategoryService";

export const CreateOffer = ({
    user,
    setUser,
}: {
    user: UserProps;
    setUser: Function;
}) => {
    let formInitialValue = {
        description: "",
        name: "",
        brand: "",
        category: "",
        price: 0,
        quantity: 0,
    };
    const navigate = useNavigate();

    let [form, setForm] = useState(formInitialValue);
    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }
    }, []);

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
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await ShoppingCartService.getShoppingcart(user.token).then((data) => {
            navigate(`/product/${data._id}`);
        });
    }
    return (
        <main role={"main"} className={styles["create-offer"]}>
            <section className={styles["create-offer__title"]}>
                <h2>Crie o seu anúncio</h2>
            </section>
            <section className={styles["create-offer__main"]}>
                <div className={styles["create-offer__image-container"]}>
                    <img src="" alt="" />
                </div>
                <div className={styles["create-offer__form-container"]}>
                    <form
                        action="POST"
                        onChange={handleForm}
                        onSubmit={handleSubmit}
                    >
                        <div className={styles["input-container"]}>
                            <label htmlFor="name">Produto</label>
                            <input
                                type="text"
                                name="name"
                                maxLength={30}
                                required
                            />
                        </div>
                        <div className={styles["larger-input-container"]}>
                            <div className={styles["input-container"]}>
                                <label htmlFor="price">Preco</label>
                                <input
                                    type="number"
                                    name="price"
                                    step="any"
                                    max={99999}
                                    required
                                />
                            </div>
                            <div className={styles["input-container"]}>
                                <label htmlFor="quantity">Unidades</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    required
                                    max={9999}
                                />
                            </div>
                        </div>
                        <div className={styles["larger-input-container"]}>
                            <div className={styles["input-container"]}>
                                <label htmlFor="brand">Marca</label>
                                <input
                                    type="text"
                                    name="brand"
                                    required
                                    maxLength={15}
                                />
                            </div>
                            <div className={styles["input-container"]}>
                                <label htmlFor="category">Categoria</label>
                                <select name="category" required>
                                    <option selected value="">
                                        -----
                                    </option>
                                    {categories.map(({ name, _id }) => {
                                        return (
                                            <option value={_id}>{name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className={styles["input-container"]}>
                            <label htmlFor="description">
                                Descreva o seu produto
                            </label>
                            <textarea name="description" maxLength={200} />
                        </div>
                        <div>
                            <SubmitBtn textValue="Anunciar" />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};
