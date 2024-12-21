import { CartType } from '../type'

export const calculateDeposit = (cart: CartType): number => {
  if (!cart) {
    return 0
  }

  const deposit = cart?.items.reduce((acc, item) => {
    // Lấy giá trị basePrice từ equipment hoặc package
    const basePrice = item.equipment?.basePrice || item.package?.basePrice

    // Nếu không có basePrice, bỏ qua mục đó
    if (!basePrice) {
      return acc
    }

    // Tính giá trị item (basePrice * quantity)
    const itemTotal = basePrice * item.quantity

    // Cộng dồn giá trị vào acc
    return acc + itemTotal
  }, 0)

  // Trả về 20% tổng giá trị đặt cọc
  return deposit * 0.2
}
