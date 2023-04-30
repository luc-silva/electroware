import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateOffer.module.css";

import ProductService from "../services/ProductService";
import { ImageBox } from "../components/Misc/ImageBox";
import { ProductForm } from "../components/Forms/ProductForm";
import { createrOfferFormInitialValue } from "../constants/initialStates";
import { ImageInput } from "../components/Inputs/ImageInput";

export const CreateOffer = ({
    user,
    setUser,
}: {
    user: IUserSession;
    setUser: Function;
}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }
    }, []);

    let blobInitialState = null as File | null;

    let [productImage, setProductImage] = useState("");
    let [productBlob, setProductBlob] = useState(blobInitialState);
    

    function setImage(event: ChangeEvent<HTMLInputElement>) {
        let files = event.target.files;
        if (files && files[0]) {
            setProductBlob(files[0]);
            setProductImage(URL.createObjectURL(files[0]));
        }
    }

    let [form, setForm] = useState(createrOfferFormInitialValue);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let formData = new FormData();

        if (productBlob instanceof File) {
            formData.append("imageField", productBlob);
            formData.append("product", JSON.stringify(form, null));

            await ProductService.createProduct(formData, user.token).then(
                (data) => {
                    navigate(`/product/${data.productID}`);
                }
            );
        }
    }

    return (
        <main role={"main"} className={styles["create-offer"]}>
            <section className={styles["create-offer__title"]}>
                <h2>Crie o seu anúncio</h2>
            </section>
            <section className={styles["create-offer__main"]}>
                <div className={styles["create-offer__image-container"]}>
                    <ImageInput imageSrc={productImage} onChange={setImage} />
                </div>
                <div className={styles["create-offer__form-container"]}>
                    <ProductForm
                        user={user}
                        form={form}
                        method="POST"
                        submitBtnText="Criar Anúncio"
                        setForm={setForm}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </section>
        </main>
    );
};
