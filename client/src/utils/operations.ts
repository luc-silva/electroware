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