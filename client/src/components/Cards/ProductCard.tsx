import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productCardInitialState } from "../../constants/initialStates";

//components & utils
import ProductService from "../../services/ProductService";
import { createImage } from "../../utils/operations";
import { CardInfo } from "../Misc/CardInfo";
import { ImageBox } from "../Misc/ImageBox";

//style
import styles from "./ProductCard.module.css";

export const ProductCard = ({ id }: { id: string }) => {
    let [productData, setProductData] = useState(productCardInitialState);
    let [cardStatus, setCardStatus] = useState({ loading: true, error: false });
    useEffect(() => {
        ProductService.getProductDetails(id)
            .then((data: any) => {
                setProductData(data);
            })
            .then(() => {
                setCardStatus({ loading: false, error: false });
            })
            .catch(() => {
                setCardStatus({ loading: false, error: true });
            });
    }, [id]);

    return (
        <Link className={styles["card-wrapper"]} to={`/product/${id}`}>
            <div className={styles["card-image"]}>
                <ImageBox
                    isLoading={cardStatus.loading}
                    imgSrc={createImage(productData.image.data)}
                />
            </div>
            <CardInfo product={productData.product as IProductDetails} isLoading={cardStatus.loading} />
        </Link>
    );
};
