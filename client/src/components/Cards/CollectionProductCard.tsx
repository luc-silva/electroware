import { ProductCard } from "./ProductCard";
import styles from "./CollectionProductCard.module.css";
import WishlistService from "../../services/WishlistService";
import { DeletebBtn } from "../Buttons/DeleteBtn";

export const CollectionProductCard = ({
    data,
    userToken,
    updateCollection,
    showToast
}: {
    data: IWishlistItem;
    userToken: string;
    updateCollection: Function;
    showToast:Function
}) => {
    async function deleteWishlistItem() {
        WishlistService.deleteWishlistInstance(userToken, data._id).then(({data}) => {
            updateCollection()
            showToast(data.message)
        }).catch(({response}) => {
            showToast(response.data, "warning")
        });
    }
    return (
        <div className={styles["collection-card"]}>
            <ProductCard id={data.product} />
            <div  className={styles["delete-btn"]}>
                <DeletebBtn onClick={deleteWishlistItem} />
            </div>
        </div>
    );
};
