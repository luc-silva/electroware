import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ProducBtnPanel.module.css";
import { QuantityCounter } from "./QuantityCounter";

export const ProductBtnPanel = ({
    user,
    product,
}: {
    product: Product;
    user: UserProps;
}) => {
    let [quantity, setQuantity] = useState(1);
    let navigate = useNavigate();

    function addToShoppingCart(event: React.MouseEvent) {
        let data = {
            user: user.id,
            product: product._id,
            price: product.price,
            quantity: quantity,
        };
        axios.post(`http://localhost:6060/api/shoppingcart/`, data, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        navigate("/shopping-cart");
    }
    function removeProduct() {
        try {
            axios.delete(`http://localhost:6060/api/product/${product._id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            navigate("/");
        } catch (err) {
            alert(err);
        }
    }

    return (
        (user.logged &&
            ((user.id != product.owner && (
                <div>
                    <QuantityCounter
                        max={product.quantity}
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                    <button onClick={addToShoppingCart}>
                        Adicionar ao carrinho
                    </button>
                </div>
            )) || (
                <div>
                    <button onClick={removeProduct}>Remover anúncio</button>
                </div>
            ))) || (
            <div>
                <Link to={"/login"}>Entre em sua conta para comprar</Link>
            </div>
        )
    );
};
