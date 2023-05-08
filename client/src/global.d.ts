interface IService {
    readonly baseUrl: string;
}

interface ISVGButtonComponentProps {
    sizing?: number;
    onClick: React.MouseEventHandler;
    weight?: IconWeight;
}

declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.jpg" {
    const value: any;
    export default value;
}


interface IWishlistCollection {
    _id: string;
    name: string;
    createdAt: string;
    privated: boolean;
}

interface IUserSession {
    username: string;
    id: string;
    token: string;
    funds: number;
    logged: boolean;
}

interface IScore {
    _id: number;
    quant: number;
}

interface IProductScoreMetrics {
    average: {
        _id: string;
        score: string;
        total_reviews: number;
    };
    scoreMetrics: IScore[];
}

interface IUserDetails {
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

interface IProductData {
    image: {
        data: string;
    };
    product: IProductDetails;
}

interface IProductDetails {
    _id: string;
    category: string;
    name: string;
    description: string;
    owner: string;
    brand: string;
    price: number;
    quantity: number;
    discount: number;
    on_sale: boolean;
}

interface IWishlistItem {
    _id: string;
    product: string;
}

interface IReview {
    author: string;
    product: string;
    productOwner: string;
    score: number;
    text: string;
    createdAt: string;
}

interface ICartItem {
    _id: string;
    owner: string;
    product: string;
    shoppingCart: string;
    price: number;
    quantity: number;
}

interface ITransaction {
    buyer: string;
    products: string[];
    paymentMethod: string;
    totalPrice: number;
    createdAt: Date;
}

interface IProductForm {
    description: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    quantity: number;
    discount: number;
    on_sale: boolean;
}