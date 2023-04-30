import { Bookmark } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createImage } from "../../utils/operations";
import { ProductBtnPanel } from "../Buttons/ProductBtnPanel";
import { ImageBox } from "../Misc/ImageBox";

import CategoryService from "../../services/CategoryService";
import UserService from "../../services/UserService";
import WishlistService from "../../services/WishlistService";

import styles from "./ProductAbout.module.css";
import { CardPriceDisplay } from "../Misc/CardPriceDisplay";

export const ProductAbout = ({
    productDetails,
    user,
    status,
    showToast,
}: {
    productDetails: ProductData;
    user: IUserSession;
    status: boolean;
    showToast: Function;
}) => {
    let [owner, setOwner] = useState({ first: "", last: "" });
    let [category, setCategory] = useState("");

    async function handleWishlist() {
        let data = {
            product: productDetails.product._id,
        };
        await WishlistService.createWishlistInstance(data, user.token).then(
            ({ message }) => {
                showToast(message);
            }
        );
    }

    useEffect(() => {
        if (productDetails.product.owner) {
            UserService.getUserInfo(productDetails.product.owner).then(
                (data) => {
                    setOwner(data.name);
                }
            );
        }
        CategoryService.getCategory(productDetails.product.category).then(
            (data) => {
                setCategory(data.name);
            }
        );
    }, [productDetails]);

    return (
        <section className={styles["product__about"]}>
            <div className={styles["product-image"]}>
                <ImageBox
                    isLoading={status}
                    imgSrc={createImage(productDetails.image.data)}
                />
            </div>
            <div className={styles["product-details"]}>
                <div className={styles["details-info"]}>
                    <div className={styles["details-header"]}>
                        <div className={styles["details-main"]}>
                            <div className={styles["details-title"]}>
                                {(status && (
                                    <div className={styles["loading-line"]} />
                                )) || <h1>{productDetails.product.name}</h1>}
                            </div>
                            <div className={styles["details-category"]}>
                                {(status && (
                                    <div className={styles["loading-line"]} />
                                )) || (
                                    <em>
                                        <Link
                                            to={`/category/${productDetails.product.category}`}
                                        >
                                            {category}
                                        </Link>
                                    </em>
                                )}
                            </div>
                        </div>
                        {user.logged &&
                            user.id !== productDetails.product.owner && (
                                <div onClick={handleWishlist}>
                                    <Bookmark
                                        size={35}
                                        color="var(--main-color)"
                                    />
                                </div>
                            )}
                    </div>
                    <div className={styles["details-pricing"]}>
                        <div className={styles["details-seller"]}>
                            {(status && (
                                <div className={styles["loading-line"]} />
                            )) || (
                                <p>
                                    {`Vendedor: `}
                                    <Link
                                        to={`/user/${productDetails.product.owner}`}
                                    >{`${owner.first} ${owner.last}`}</Link>
                                </p>
                            )}
                        </div>
                        <div className={styles["details-price"]}>
                            {(status && (
                                <div className={styles["loading-line"]} />
                            )) || (
                                <CardPriceDisplay
                                    discount={productDetails.product.discount}
                                    on_sale={productDetails.product.on_sale}
                                    price={productDetails.product.price}
                                />
                            )}
                        </div>
                    </div>
                    <div className={styles["details-description"]}>
                        {(status && (
                            <div className={styles["loading-line"]} />
                        )) ||
                            productDetails.product.description ||
                            "Nenhuma descrição disponível"}
                    </div>
                </div>
                <div className={styles["details-misc"]}>
                    <p>{`Unidades disponíveis: ${productDetails.product.quantity}`}</p>
                    <ProductBtnPanel
                        user={user}
                        product={productDetails.product}
                        showToast={showToast}
                    />
                </div>
            </div>
        </section>
    );
};
