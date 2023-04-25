export function getAverage(reviews: Review[]): number {
    let total = 0;
    reviews.forEach((review: Review) => {
        total += review.score;
    });
    return total === 0 ? 0 : Number((total / reviews.length).toFixed(1));
}
export function getTotalValue(items:ShoppingCartCardProps[]) {
    let total = 0;
    items.forEach(({ price, quantity }: ShoppingCartCardProps) => {
        total += price * quantity;
    });
    return total;
}
export function createImage(bufferArr:any) {
    let blob = new Blob([new Uint8Array(bufferArr)], {
        type: "image/jpeg",
    });
    let srcBlob = URL.createObjectURL(blob);
    return (srcBlob)
}
export function checkForUser(
    arrayOfReviews: { author: string }[],
    userId: string
) {
    return arrayOfReviews.every(({ author }) => {
        if(author){
            return author !== userId;
        }
        return false
    });
}