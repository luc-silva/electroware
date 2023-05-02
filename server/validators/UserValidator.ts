import { Response } from "express";
import { Validator } from "../interface";

interface UserNameFieldname {
    first: string;
    last: string;
}
interface UserLocationField {
    country: string;
    state: string;
}
interface UserBody {
    email: string;
    password: string;
    new_password: string;
    name: UserNameFieldname;
    location: UserLocationField;
    description: string;
}

class UserValidator implements Validator {
    private emailRegex = /.*@\w*.\.com/g;

    public validate(response: Response, requestBody: UserBody): void {
        let { name, description } = requestBody;

        if (!name.first || name.first.length > 10 || name.last.length > 10) {
            response.status(400);
            throw new Error("Campo nome Inválido.");
        }

        if (description.length > 250) {
            response.status(400);
            throw new Error("Campo descrição Inválido.");
        }
    }

    public validatePasswordChange(response: Response, requestBody: UserBody) {
        let { new_password } = requestBody;
        console.log(new_password)
        this.validatePassword(response, new_password);
    }

    public validateRegistration(response: Response, requestBody: UserBody) {
        let { email, password, name, location, description } = requestBody;
        this.validateEmail(response, email);
        this.validatePassword(response, password);
        this.validateName(response, name);
        this.validateLocation(response, location);
        this.validateDescription(response, description);
    }

    private validateEmail(response: Response, email: string) {
        if (!email || !email.match(this.emailRegex)) {
            response.status(400);
            throw new Error("Campo email inválido.");
        }
    }

    private validatePassword(response: Response, password: string) {
        if (!password || password.length < 8) {
            response.status(400);
            throw new Error("Campo senha inválido.");
        }
    }

    private validateName(response: Response, name: UserNameFieldname) {
        if (
            !name ||
            !name.first ||
            name.first.length > 10 ||
            name.last.length > 10
        ) {
            response.status(400);
            throw new Error("Campo nome Inválido.");
        }
    }

    private validateDescription(response: Response, description: string) {
        if (description.length > 250) {
            response.status(400);
            throw new Error("Campo descrição Inválido.");
        }
    }

    private validateLocation(response: Response, location: UserLocationField) {
        if (!location.country || !location.state) {
            response.status(400);
            throw new Error("Campo estado ou país Inválidos.");
        }
    }
}

export default new UserValidator();
