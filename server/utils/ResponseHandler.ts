import { Response } from "express";

class ResponseHandler {
    public handleResponse(response: Response, status: number, message: string) {
        response.status(status).json({ message });
    }
}
export default new ResponseHandler()