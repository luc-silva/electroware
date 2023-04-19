import { Response } from "express";
import { Validator } from "../interface";

interface UserBody {
    email: string;
    password: string;
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
    private emailRegex = /.*@\w*.\.com/g;

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

    public validateRegistration(response: Response, requestBody: UserBody) {
        let { email, password, name, location, description } = requestBody;

        if (!password || password.length < 8) {
            response.status(400);
            throw new Error("Campo senha inválido.");
        }
        if (!email || !email.match(this.emailRegex)) {
            response.status(400);
            throw new Error("Campo email inválido.");
        }
        if (!name || !name.first || name.first.length > 10 || name.last.length > 10) {
            response.status(400);
            throw new Error("Campo nome Inválido.");
        }

        if (!location.country || !location.state) {
            response.status(400);
            throw new Error("Campo estado ou país Inválidos.");
        }
    }
}

export default new UserValidator();
