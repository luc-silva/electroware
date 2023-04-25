import ImageInstance from "../models/ImageInstance";
import { Repository } from "./Repository";

interface ImageData {
    buffer: Buffer;
    imageType: "productImage" | "userImage";
}

class ImageRepository extends Repository {
    /**
     * Get use image with given user id.
     * @param objectId - User ObjectId.
     * @returns Returns image data object.
     */
    public async getUserImage(objectId: string) {
        this.validateObjectId(objectId);
        return await ImageInstance.findOne({
            user: objectId,
            imageType: "userImage",
        });
    }

    /**
     * Get product image with given product id.
     * @param objectId - Product ObjectId.
     * @returns Returns image data object.
     */
    public async getProductImage(objectId: string) {
        this.validateObjectId(objectId);
        return await ImageInstance.findOne({
            product: objectId,
            imageType: "productImage",
        });
    }

    /**
     *Create a image with given image buffer, user id and image name.
     *@param objectId - User ObjectId.
     *@param imageData - data containg image file buffer and image type. 
     imageType should be productImage or userImage.
     */
    public async createImage(
        objectId: string,
        { imageType, buffer }: ImageData
    ) {
        this.validateObjectId(objectId);
        await ImageInstance.create({
            user: objectId,
            imageType,
            data: buffer,
            imageName: `${objectId}`,
        });
    }

    /**
     * Update or create a user image with given id and image file
     *@param objectId - ImageInstance ObjectId.
     *@param imageData - data containg image file buffer and image type.
     */
    public async updateImage(objectId: string, imageData: ImageData) {
        await ImageInstance.findByIdAndUpdate(objectId, imageData);
    }
}

export default new ImageRepository();
