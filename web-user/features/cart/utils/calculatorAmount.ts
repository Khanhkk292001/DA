type CalculateAmountParams = {
  rentalPrice: number
  durationType: 'day' | 'week' | 'month'
  durationValue: number | string
}

export const calculatorAmount = ({ durationType, rentalPrice, durationValue }: CalculateAmountParams) => {
  switch (durationType) {
    case 'day':
      return rentalPrice * Number(durationValue)
    case 'week':
      return rentalPrice * Number(durationValue) * 7
    case 'month':
      return rentalPrice * Number(durationValue) * 30
    default:
      return 0
  }
}
