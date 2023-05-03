export const cardInitialState = {
    _id: " ",
    seller: {
        name: {
            first: " ",
            last: " ",
        },
        _id: " ",
    },
    product: {
        _id: "",
        owner: "",
        category: "",
        name: "",
        discount: 0,
        on_sale: false,
    },
    productImage: {
        data: { data: "" },
    },
    price: 0,
    quantity: 0,
};

export const productRatingInitialState = {
    average: {
        _id: "",
        score: "0",
        total_reviews:0
    },
    scoreMetrics: [
        {
            _id: 5,
            quant: 0,
        },
        {
            _id: 4,
            quant: 0,
        },
        {
            _id: 3,
            quant: 0,
        },
        {
            _id: 2,
            quant: 0,
        },
        {
            _id: 1,
            quant: 0,
        },
        {
            _id: 0,
            quant: 0,
        },
    ],
};

export const productCardInitialState = {
    product: {
        price: 0,
        name: "",
    },
    image: { data: null as null | string },
};
export const profileSettingsFormInitalState = {
    name: {
        first: "",
        last: "",
    },
    location: {
        state: "",
        country: "",
    },
    description: "",
};
export const imageInitialValue = null as null | string;
export const userSessionInitialState = {
    id: "",
    funds: 0,
    username: "",
    token: "",
    logged: false,
    description: "",
};
export const productInitialState = {
    product: {
        price: 0,
        discount: 0,
        on_sale: false,
        name: "",
        owner: "",
        _id: "",
    },
    image: { data: null as null | string },
};

export const createrOfferFormInitialValue = {
    description: "",
    name: "",
    brand: "",
    category: "",
    price: 0,
    quantity: 0,
    discount: 0,
    on_sale: false,
};
export const loginFormInitialValue = {
    email: "",
    password: "",
};
export const registrationFormInitialValues = {
    first: "",
    last: "",
    state: "",
    country: "",
    email: "",
    password: "",
};
export const productPageInitialState = {
    image: { data: "" },
    product: {
        _id: "",
        category: "",
        name: "",
        description: "",
        brand: "",
        owner: "",
        price: 0,
        quantity: 0,
        discount: 0,
        on_sale: false,
    },
};
export const userProfileInitialValues = {
    name: {
        first: "",
        last: "",
    },
    location: {
        state: "",
        country: "",
    },
    email: "",
    createdAt: new Date(),
    description: "",
};
export const reviewsInitialState = {
    _id: "",
    author: {
        name: {
            first: "",
            last: "",
        },
        _id: "",
    },
    product: "",
    productOwner: "",
    score: 0,
    text: "",
    createdAt: new Date(),
    updatedAt: new Date(),
};
