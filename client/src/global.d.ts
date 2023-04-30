interface IUserSession {
    username: string;
    id: string;
    token: string;
    funds: number;
    logged: boolean;
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
interface UserData {
    name: {
        first: string;
        last: string;
    };
    location: {
        country: string;
        state: string;
    };
    description: string;
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

declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}
declare module "*.jpg" {
    const value: any;
    export default value;
}
