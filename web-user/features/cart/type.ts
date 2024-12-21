import { z } from 'zod'
import { EquipmentType } from '../home'

export type PackageType = {
  id: string
  name: string
  description: string
  basePrice: number
  image: string
  createdAt: string // ISO Date string
  updatedAt: string // ISO Date string
}

export type CartItemType = {
  id: string // ID của mục trong giỏ hàng
  cartId: string // ID của giỏ hàng
  equipmentId: string // ID của thiết bị liên quan
  packageId: string | null // ID của gói (có thể null)
  quantity: number // Số lượng
  basePrice: number // Giá gốc
  createdAt: string // Thời gian tạo mục
  updatedAt: string // Thời gian cập nhật mục
  equipment: EquipmentType // Thông tin thiết bị
  package: PackageType | null // Thông tin gói (nếu có)
}

export type CartType = {
  totalAmount: number // Thời gian cập nhật giỏ hàng
  items: CartItemType[] // Danh sách các mục trong giỏ hàng
}

export type CartResponseType = CartType

const CartItemSchema = z.object({
  equipmentId: z.string().min(1, 'Equipment ID phải có ít nhất 1 ký tự'), // ID của thiết bị
  packageId: z.string().min(1, 'Package ID phải có ít nhất 1 ký tự'), // ID của gói
  quantity: z.number().min(1, 'Số lượng phải lớn hơn hoặc bằng 1'), // Số lượng, tối thiểu là 1
  durationType: z.enum(['day', 'week', 'month']), // Loại thời lượng (day/week/month)
  durationValue: z.number().min(1, 'Thời lượng phải lớn hơn hoặc bằng 1'), // Giá trị thời lượng
  price: z.number().min(0, 'Giá phải lớn hơn hoặc bằng 0'), // Giá trị không âm
})

export const CartInputSchema = z.object({
  durationValue: z
    .number()
    .min(1, 'Thời lượng phải lớn hơn hoặc bằng 1')
    .or(z.string().min(1, 'Thời lượng phải lớn hơn hoặc bằng 1')), // Giá trị thời lượng
  durationType: z.enum(['day', 'week', 'month']), // Loại thời lượng (day/week/month)
  startDate: z.string().min(1, 'Ngày bắt đầu phải có ít nhất 1 ký tự').or(z.date()), // Ngày bắt đầu
  endDate: z.string().min(1, 'Ngày kết thúc phải có ít nhất 1 ký tự').or(z.date()), // Ngày kết thúc
  items: z.array(CartItemSchema).optional().nullable(), // Danh sách các mục trong giỏ hàng
  totalAmount: z.number().min(0, 'Tổng số tiền phải lớn hơn hoặc bằng 0'), // Tổng số tiền, không âm
  address: z.string().min(1, 'Địa chỉ phải có ít nhất 1 ký tự'), // Địa chỉ
})

export type CartInputType = z.infer<typeof CartInputSchema>

export type DiscountType = {
  id: string
  code: string
  discountRate: number // Phần trăm giảm giá
  validFrom: string // ISO 8601 date string
  validTo: string // ISO 8601 date string
  maxUsage: number // Số lần sử dụng tối đa
  currentUsage: number // Số lần đã sử dụng
  isActive: boolean | null // Trạng thái hoạt động (có thể null nếu chưa xác định)
  createdAt: string // ISO 8601 date string
  updatedAt: string // ISO 8601 date string
}

export type DiscountResponseType = {
  data: DiscountType
}
