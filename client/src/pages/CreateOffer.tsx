import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateOffer.module.css";

import ProductService from "../services/ProductService";
import { ImageBox } from "../components/Misc/ImageBox";
import { CreateOfferForm } from "../components/Forms/CreateOfferForm";

export const CreateOffer = ({
    user,
    setUser,
}: {
    user: UserProps;
    setUser: Function;
}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }
    }, []);

    let blobInitialState = null as File | null;
    let [productBlob, setProductBlob] = useState(blobInitialState);

    let [productImage, setProductImage] = useState("");
    function setImage(event: ChangeEvent<HTMLInputElement>) {
        let files = event.target.files;
        if (files && files[0]) {
            setProductBlob(files[0]);
            setProductImage(URL.createObjectURL(files[0]));
        }
    }

    let formInitialValue = {
        description: "",
        name: "",
        brand: "",
        category: "",
        price: 0,
        quantity: 0,
    };
    let [form, setForm] = useState(formInitialValue);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let formData = new FormData();

        if (productBlob instanceof File) {
            formData.append("imageField", productBlob);
            formData.append("product", JSON.stringify(form, null));

            await ProductService.createProduct(formData, user.token).then(
                (data) => {
                    navigate(`/product/${data._id}`);
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
                    <ImageBox isLoading={false} imgSrc={productImage} />
                    <div>
                        <input
                            type="file"
                            name="productImage"
                            onChange={setImage}
                        />
                    </div>
                </div>
                <div className={styles["create-offer__form-container"]}>
                    <CreateOfferForm
                        user={user}
                        form={form}
                        setForm={setForm}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </section>
        </main>
    );
};
