/**
 * Return the average score of a product iwth given array of product reviews.
 * @param reviews - Array of review objects.
 * @returns String containing the average product score.
 */
export function getAverage(reviews: IReview[]): number {
    let total = 0;
    reviews.forEach((review: IReview) => {
        total += review.score;
    });
    return total === 0 ? 0 : Number((total / reviews.length).toFixed(1));
}

/**
 * Return the total price of the shopping cart with given array of cart instances.
 * @param items - Array of product objects.
 * @returns Total price in number.
 */
export function getTotalValue(items: ICartItem[]) {
    let total = 0;
    items.forEach(({ price, quantity }: ICartItem) => {
        total += price * quantity;
    });
    return total;
}

/**
 * Create an image and returns its path with given buffer array.
 * @param bufferArr Image buffer.
 * @returns Image path
 */
export function createImage(bufferArr: any) {
    let blob = new Blob([new Uint8Array(bufferArr)], {
        type: "image/jpeg",
    });
    let srcBlob = URL.createObjectURL(blob);
    return srcBlob;
}
/**
 * Check if user has already made a review in a product by checking its reviews.
 * @param arrayOfReviews Array of review objects.
 * @param userId User ObjectId.
 * @returns true if user has been found, false if not.
 */
export function checkForUser(
    arrayOfReviews: { author: string }[],
    userId: string
) {
    return arrayOfReviews.every(({ author }) => {
        if (author) {
            return author !== userId;
        }
        return false;
    });
}

/**
 * Calculate the value over the percentage.
 * @param total Total value.
 * @param percent Percentage to be calculated.
 * @returns Number represeting the result.
 */
export function calculateDiscountedValue(total: number, percent: number) {
    return total - (percent * total) / 100;
}

/**
 * Stops the propagation of a mouse event.
 * @param event MouseEvent.
 */
export function stopEventPropagation(event: React.MouseEvent) {
    event.stopPropagation();
}

/* export function sortarray<T>(arr: Array<T>): Array<T>{
    let arrCopy = [...arr]
    arr.forEach((item) => {
    })
    return []
}
 */