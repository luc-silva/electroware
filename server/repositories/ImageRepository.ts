import ImageInstance from "../models/ImageInstance";
import { Repository } from "./Repository";

interface ImageData {
    buffer: Buffer;
    imageType: "productImage" | "userImage";
}

class ImageRepository extends Repository {
    /**
     * Get use image with given userId
     *
     * @param objectId - user id
     */
    public async getUserImage(objectId: string) {
        this.validateObjectId(objectId);
        return await ImageInstance.findOne({
            user: objectId,
            imageType: "userImage",
        });
    }

    /**
     *Create a image with given image buffer, user id and image name.
     *
     *@param objectId - User id.
     *@param imageData - data containg image file buffer and image type. 
     imageType should be productImage or userImage.
     */
    public async createImage(objectId: string, imageData: ImageData) {
        this.validateObjectId(objectId);
        await ImageInstance.create({...imageData, imageName:`${objectId}`});
    }

    /**
     * Update or create a user image with given id and image file
     * 
     *@param objectId - ImageInstance id.
     *@param imageData - data containg image file buffer and image type. 
     */
    public async updateImage(objectId: string, imageData: ImageData) {
        await ImageInstance.findByIdAndUpdate(objectId, imageData);
    }
}

export default new ImageRepository();
