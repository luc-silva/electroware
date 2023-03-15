import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateOffer.module.css";

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
    let [form, setForm] = useState(formInitialValue);
    const navigate = useNavigate()
    useEffect(() => {
        if(!user.logged){
            navigate("/login")
        }
    }, [])
    function handleForm(event: FormEvent<HTMLFormElement>) {
        let target = event.target;
        if (
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement
        ) {
            setForm({ ...form, [target.name]: target.value });
        }
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post(
            "http://localhost:6060/api/product/create",
            { ...form },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
    }
    return (
        <main role={"main"} className={styles["create-offer"]}>
            <section className={styles["create-offer__title"]}>
                <h2>Crie o seu anuncio</h2>
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
                                    step={"any"}
                                    required
                                />
                            </div>
                            <div className={styles["input-container"]}>
                                <label htmlFor="quantity">Unidades</label>
                                <input type="number" name="quantity" required />
                            </div>
                        </div>
                        <div className={styles["larger-input-container"]}>
                            <div className={styles["input-container"]}>
                                <label htmlFor="brand">Marca</label>
                                <input type="text" name="brand" required />
                            </div>
                            <div className={styles["input-container"]}>
                                <label htmlFor="category">Categoria</label>
                                <select name="category" required>
                                    <option value="640126c1eb64172330a83a22">
                                        Novo Teste
                                    </option>
                                    <option value="640126c1eb64172330a83a22">
                                        Novo Teste
                                    </option>
                                    <option value="640126c1eb64172330a83a22">
                                        Novo Teste
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className={styles["input-container"]}>
                            <label htmlFor="description">
                                Descreva o seu produto
                            </label>
                            <textarea name="description" maxLength={200} />
                        </div>
                        <div className={styles["input-container"]}>
                            <input type="submit" value={"Anunciar"} />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};
