interface UserProps {
    username: string;
    id: string;
    token: string;
    funds: number;
    logged: boolean;
    description: string;
}

interface HeaderProps {
    isLoading: Boolean;
    isLogged: Boolean;
    user: UserProps | null;
}
interface PageProps {
    user: UserProps | null;
    isLogged: Boolean;
}

interface ProductData {
    image: {
        data: string;
    };
    product: Product;
}
interface Product {
    name: string;
    owner: string;
    category: string;
    description: string;
    _id: string;
    price: number;
    quantity: number;
}

interface WishlistItem {
    id: string;
    product: string;
}
interface Review {
    author: string;
    authorUsername: string;
    product: string;
    productOwner: string;
    score: number;
    text: string;
    createdAt: string;
}
interface ShoppingCartCardProps {
    _id: string;
    owner: string;
    product: string;
    shoppingCart: string;
    price: number;
    quantity: number;
}
interface Transaction {
    buyer: string;
    products: ProductInstance[];
    paymentMethod: string;
    totalPrice: number;
    createdAt: Date;
}
interface ProductInstance {
    user: string;
    seller: string;
    product: string;
    price: number;
    quantity: number;
}

interface ServiceInterface {
    baseUrl: string;
}
