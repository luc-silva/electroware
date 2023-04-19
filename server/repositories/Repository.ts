import { Types } from "mongoose";

export class Repository {
    protected validateObjectId(objectId: string) {
        if (!Types.ObjectId.isValid(objectId)) {
            throw new Error("Invalid Object ID.");
        }
    }
}
