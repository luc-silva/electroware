import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductService";
import ShoppingCartService from "../../services/ShoppingCartService";
import { QuantityCounter } from "../QuantityCounter";
import { ActionBtn } from "./ActionBtn";
import styles from "./ProducBtnPanel.module.css";

export const ProductBtnPanel = ({
    user,
    product,
}: {
    product: Product;
    user: UserProps;
}) => {
    let [quantity, setQuantity] = useState(1);
    let navigate = useNavigate();

    async function addToShoppingCart() {
        let data = {
            user: user.id,
            product: product._id,
            price: product.price,
            quantity: quantity,
        };

        await ShoppingCartService.createCartInstance(data, user.token).then(
            () => {
                navigate("/shopping-cart");
            }
        );
    }

    async function removeProduct() {
        await ProductService.removeProduct(product._id, user.token).then(() => {
            navigate("/");
        });
    }

    return (
        (user.logged &&
            ((user.id != product.owner &&
                ((product.quantity > 0 && (
                    <div className={styles["panel-container"]}>
                        <QuantityCounter
                            max={product.quantity}
                            quantity={quantity}
                            setQuantity={setQuantity}
                        />
                        <ActionBtn
                            onClick={addToShoppingCart}
                            textValue="Adicionar ao carrinho"
                        />
                    </div>
                )) || <ActionBtn disabled textValue="Produto Esgotado" />)) || (
                <div className={styles["panel-container"]}>
                    <ActionBtn
                        textValue="Remover anúncio"
                        onClick={removeProduct}
                    />
                </div>
            ))) || <Link to={"/login"}>Entre em sua conta para comprar</Link>
    );
};
