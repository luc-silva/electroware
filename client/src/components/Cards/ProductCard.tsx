import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { createImage } from "../../utils/operations";
import { CardInfo } from "../Misc/CardInfo";
import { ImageBox } from "../Misc/ImageBox";
import styles from "./ProductCard.module.css";

export const ProductCard = ({ id }: { id: string }) => {
    let productCardInitialState = {
        product: {
            price: 0,
            name: "",
        },
        image: { data: null as null | string },
    };

    let [productData, setProductData] = useState(productCardInitialState);
    let [cardStatus, setCardStatus] = useState({ loading: true, error: false });
    useEffect(() => {
        ProductService.getProductDetails(id)
            .then((data: any) => {
                console.log(data)
                setProductData(data);
            })
            .then(() => {
                setCardStatus({ loading: false, error: false });
            })
            .catch(() => {
                setCardStatus({ loading: false, error: true });
            });
    }, []);

    return (
        <Link className={styles["card-wrapper"]} to={`/product/${id}`}>
            <div className={styles["card-image"]}>
                <ImageBox
                    isLoading={cardStatus.loading}
                    imgSrc={createImage(productData.image.data)}
                />
            </div>
            <CardInfo product={productData.product as Product} isLoading={cardStatus.loading} />
        </Link>
    );
};
