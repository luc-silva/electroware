import { Bookmark } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../services/CategoryService";
import UserService from "../../services/UserService";
import WishlistService from "../../services/WishlistService";
import { ProductBtnPanel } from "../Buttons/ProductBtnPanel";
import styles from "./ProductAbout.module.css";

export const ProductAbout = ({
    productDetails,
    user,
}: {
    productDetails: Product;
    user: UserProps;
}) => {
    let [owner, setOwner] = useState({ first: "", last: "" });
    let [category, setCategory] = useState("");

    async function handleWishlist() {
        let data = {
            product: productDetails._id,
        }
        await WishlistService.createWishlistInstance(data, user.token).then(() => {
            //add toaster
        })
    }

    useEffect(() => {
        UserService.getUserInfo(productDetails.owner).then((data) => {
            setOwner(data.name);
        });
        CategoryService.getCategory(productDetails.category).then((data) => {
            setCategory(data.name);
        });
    }, [productDetails]);

    return (
        <section className={styles["product__about"]}>
            <div className={styles["product-image"]}>
                {/* <img src="" alt="" /> */}
            </div>
            <div className={styles["product-details"]}>
                <div className={styles["details-info"]}>
                    <div className={styles["details-title"]}>
                        <div>
                            <h1>{productDetails.name}</h1>
                            <em>
                                <Link
                                    to={`/category/${productDetails.category}`}
                                >
                                    {category}
                                </Link>
                            </em>
                        </div>
                        {user.logged && user.id !== productDetails.owner && (
                            <div onClick={handleWishlist}>
                                <Bookmark size={35} color="var(--main-color)" />
                            </div>
                        )}
                    </div>
                    <div className={styles["details-pricing"]}>
                        <div>
                            <p>
                                {`Vendedor: `}
                                <Link
                                    to={`/user/${productDetails.owner}`}
                                >{`${owner.first} ${owner.last}`}</Link>
                            </p>
                            <div>Reputação: 4.0</div>
                        </div>
                        <h2>{`${productDetails.price}$`}</h2>
                    </div>
                    <div className={styles["details-description"]}>
                        {productDetails.description ||
                            "Nenhuma descrição disponível"}
                    </div>
                </div>
                <div className={styles["details-misc"]}>
                    <p>{`Unidades disponíveis: ${productDetails.quantity}`}</p>
                    <ProductBtnPanel user={user} product={productDetails} />
                </div>
            </div>
        </section>
    );
};
