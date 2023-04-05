import { Response } from "express";
import { Validator } from "../interface";

enum PaymentOptions {
    bankSlip = "Boleto",
    creditCard = "Cartão de Crédito",
    bitcoin = "Bitcoin",
    pix = "Pix",
}

interface TransactionBody {
    paymentMethod: PaymentOptions;
}

class TransactionValidator implements Validator {
    public validate(response: Response, requestBody: TransactionBody): void {
        let { paymentMethod } = requestBody;

        if (
            (!paymentMethod && typeof paymentMethod !== "string") ||
            !Object.values(PaymentOptions).includes(paymentMethod)
        ) {
            response.status(400);
            throw new Error("Método de pagamento inválido.");
        }
    }
}

export default new TransactionValidator();
