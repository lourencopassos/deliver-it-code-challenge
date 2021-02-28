export const expiredBillValidator = (daysDifference: number) => {
  if (daysDifference < 0) {
    return true
  }
  return false
}