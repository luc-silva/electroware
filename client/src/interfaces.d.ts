interface UserProps {
    username: String;
    id: String;
    token: String;
    saldo: Number;
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

interface Product {
    name: String;
    owner: String;
    category: String;
    description: String;
    _id: String;
    price: Number;
    quantity: Number;
    reviews: Number;
}
interface Review{
    author: string;
    authorUsername: string;
    product: string;
    productOwner: string;
    score: number;
    text: string;
    createdAt: string;
}
