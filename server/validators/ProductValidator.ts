import { Response } from "express";

interface ProductBody {
    name: string;
    price: number;
    category: number;
    quantity: number;
    description: string;
    brand: string;
    on_sale: boolean;
    discount: number;
}

class ProductValidator {
    private NAME_MAX_LENGTH = 30;
    private BRAND_MAX_LENGTH = 15;
    private DESCRIPTION_MAX_LENGTH = 200;
    private MAX_PRICE = 10000;
    private MAX_QUANTITY = 3000;

    public validate(response: Response, productBody: ProductBody) {
        let {
            name,
            price,
            category,
            quantity,
            description,
            brand,
            discount,
            on_sale,
        } = productBody;
        let convertedQuantity: number = Number(quantity);
        let convertedPrice: number = Number(price);

        if (
            (!name && typeof name !== "string") ||
            name.length > this.NAME_MAX_LENGTH
        ) {
            response.status(400);
            throw new Error("Campo nome Inválido.");
        }
        if (!category && typeof category !== "string") {
            response.status(400);
            throw new Error("Campo categoria Inválido.");
        }
        if (
            (!description && typeof description !== "string") ||
            description.length > this.DESCRIPTION_MAX_LENGTH
        ) {
            response.status(400);
            throw new Error("Campo descrição Inválido.");
        }

        if (
            (!brand && typeof brand !== "string") ||
            brand.length > this.BRAND_MAX_LENGTH
        ) {
            response.status(400);
            throw new Error("Campo marca Inválido.");
        }
        if (isNaN(convertedPrice) || convertedPrice > this.MAX_PRICE) {
            response.status(400);
            throw new Error("Campo preço Inválido.");
        }
        if (
            !Number.isInteger(convertedQuantity) ||
            convertedQuantity > this.MAX_QUANTITY
        ) {
            response.status(400);
            throw new Error("Campo quantidade Inválido.");
        }
        if (isNaN(discount)) {
            response.status(400);
            throw new Error("Campo disconto inválido");
        }
    }
}
export default new ProductValidator();
