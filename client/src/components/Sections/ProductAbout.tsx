import { Bookmark } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../services/CategoryService";
import UserService from "../../services/UserService";
import WishlistService from "../../services/WishlistService";
import { createImage } from "../../utils/operations";
import { ProductBtnPanel } from "../Buttons/ProductBtnPanel";
import { ImageBox } from "../Misc/ImageBox";
import styles from "./ProductAbout.module.css";

export const ProductAbout = ({
    productDetails,
    user,
    status
}: {
    productDetails: ProductData;
    user: UserProps;
    status: boolean
}) => {
    let [owner, setOwner] = useState({ first: "", last: "" });
    let [category, setCategory] = useState("");

    async function handleWishlist() {
        let data = {
            product: productDetails.product._id,
        };
        await WishlistService.createWishlistInstance(data, user.token).then(
            () => {
                //add toaster
            }
        );
    }

    useEffect(() => {
        UserService.getUserInfo(productDetails.product.owner).then((data) => {
            setOwner(data.name);
        });
        CategoryService.getCategory(productDetails.product.category).then(
            (data) => {
                setCategory(data.name);
            }
        );
    }, [productDetails]);

    return (
        <section className={styles["product__about"]}>
            <div className={styles["product-image"]}>
                <ImageBox isLoading={status} imgSrc={createImage(productDetails.image.data)}/>
            </div>
            <div className={styles["product-details"]}>
                <div className={styles["details-info"]}>
                    <div className={styles["details-title"]}>
                        <div>
                            <h1>{productDetails.product.name}</h1>
                            <em>
                                <Link
                                    to={`/category/${productDetails.product.category}`}
                                >
                                    {category}
                                </Link>
                            </em>
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
                        <div>
                            <p>
                                {`Vendedor: `}
                                <Link
                                    to={`/user/${productDetails.product.owner}`}
                                >{`${owner.first} ${owner.last}`}</Link>
                            </p>
                            <div>Reputação: 4.0</div>
                        </div>
                        <h2>{`${productDetails.product.price}$`}</h2>
                    </div>
                    <div className={styles["details-description"]}>
                        {productDetails.product.description ||
                            "Nenhuma descrição disponível"}
                    </div>
                </div>
                <div className={styles["details-misc"]}>
                    <p>{`Unidades disponíveis: ${productDetails.product.quantity}`}</p>
                    <ProductBtnPanel user={user} product={productDetails.product} />
                </div>
            </div>
        </section>
    );
};
