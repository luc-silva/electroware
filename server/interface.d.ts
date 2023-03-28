import { Request } from "express";

interface IUser{
    
}
export interface IRequest extends Request{
    user: {
        id:string;
    };
}