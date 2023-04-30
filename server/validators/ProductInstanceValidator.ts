import { Response } from "express"
import { Validator } from "../interface"

interface ProductInstanceBody{
    user:string
    product: string
    price: number
    quantity: number
}

class ProductInstanceValidator implements Validator {
    public validate(response: Response, requestBody: ProductInstanceBody){
        let { user, product, price, quantity }= requestBody;
        if(!user && typeof user !== "string"){
            response.status(400)
            throw new Error("Campo usuário Inválido.")
        }
        if (!product && typeof product !== "string"){
            response.status(400)
            throw new Error("Campo produto Inválido.")
        }
        if(!price&& typeof price !== "number"){
            response.status(400)
            throw new Error("Campo preço Inválido.")
        }
        if(!Number.isInteger(quantity)) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }
    }
}

export default new ProductInstanceValidator();