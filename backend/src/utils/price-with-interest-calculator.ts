export const priceWithInteresetUpToThree = (original_price: number, daysDifferencePositive: number): number => {
  return +((original_price + (original_price * 0.02) + daysDifferencePositive * (original_price * 0.001))).toFixed(2)
}

export const priceWithInteresetBetweenThreeAndFive = (original_price: number, daysDifferencePositive: number): number => {
  return +((original_price + (original_price * 0.03) + daysDifferencePositive * (original_price * 0.002))).toFixed(2)
}

export const priceWithInteresetMoreThanFive = (original_price: number, daysDifferencePositive: number): number => {
  return +(((original_price + (original_price * 0.05)) + daysDifferencePositive * (original_price * 0.003))).toFixed(2)
}