/**
 * Calculate the value over the percentage.
 * @param total Total value.
 * @param percent Percentage to be calculated.
 * @returns Number represeting the result.
 */
export function calculateDiscountedValue(total: number, percent: number) {
    return total - (percent * total) / 100;
}