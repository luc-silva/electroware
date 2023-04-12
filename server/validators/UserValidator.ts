import { Response } from "express";
import { Validator } from "../interface";

interface UserBody {
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

class UserValidator implements Validator {
    public validate(response: Response, requestBody: UserBody): void {
        let { name, location, description } = requestBody;
        if (!name.first || name.first.length > 10 || name.last.length > 10) {
            response.status(400);
            throw new Error("Campo nome Inválido.");
        }

        if (!location.country || !location.state) {
            response.status(400);
            throw new Error("Campo estado ou país Inválidos.");
        }

        if (description.length > 250) {
            response.status(400);
            throw new Error("Campo descrição Inválido.");
        }
    }
}

export default new UserValidator();
