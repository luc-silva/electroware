import { Bookmarks, ShoppingCart } from "phosphor-react";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

export const PageIcons = ({ onClick }: { onClick?: MouseEventHandler }) => {
    return (
        <>
            <Link to={"/shopping-cart"} onClick={onClick}>
                <ShoppingCart size={30} />
            </Link>
            <Link to={"/wishlist"} onClick={onClick}>
                <Bookmarks size={30} />
            </Link>
        </>
    );
};
