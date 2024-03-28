export default function getDiscountedPrice(
  type: 'PERCENTAGE' | 'FIXED-AMOUNT' | undefined,
  originalPrice: number,
  sale?: number | null
) {
  if (type === 'PERCENTAGE') {
    return originalPrice - originalPrice * ((sale ?? 0) / 100)
  } else if (type === 'FIXED-AMOUNT') {
    return originalPrice - (sale ?? 0)
  } else {
    return originalPrice
  }
}
