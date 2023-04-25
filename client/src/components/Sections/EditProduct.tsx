import { FormEvent, useEffect, useState } from "react";
import { ProductForm } from "../Forms/ProductForm";
import styles from "./EditProduct.module.css";
import { createrOfferFormInitialValue } from "../../constants/initialStates";
import ProductService from "../../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";
import { UserImageInput } from "../Inputs/UserImageInput";

export const EditProduct = ({ user, showToast }: { user: UserProps, showToast:Function }) => {
    const navigate = useNavigate();
    let { id } = useParams();

    let [form, setForm] = useState(createrOfferFormInitialValue);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (id) {
            ProductService.updateProduct(form, user.token, id).then((data) => {
            showToast(data.message,"info");

                navigate(`/product/${id}`);
            });
        }
    }

    useEffect(() => {
        if (id) {
            ProductService.getProductDetails(id).then(({ product, image }) => {
                setForm(product);
            });
        }
    }, []);
    return (
        <section className={styles["edit-product"]}>
            <div className={styles["edit-product__title"]}>
                <h2>Edite o produto</h2>
            </div>
            <div className={styles["edit-product__image-container"]}>
                <UserImageInput
                    inputType="productImage"
                    user={user}
                    productId={id}
                />
            </div>
            <div className={styles["edit-product__form-container"]}>
                <ProductForm
                    form={form}
                    method="PUT"
                    submitBtnText="Atualizar Produto"
                    handleSubmit={handleSubmit}
                    setForm={setForm}
                    user={user}
                />
            </div>
        </section>
    );
};
