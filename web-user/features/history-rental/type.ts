import { z } from 'zod'

export type RentalItemType = {
  id: string
  rentalId: string
  equipmentId: string
  equipment: {
    name: string
  }
  packageId: string | null
  quantity: number
  durationType: 'day' | 'week' | 'month'
  durationValue: number
  price: number
  createdAt: string
  updatedAt: string
}

export type RentalType = {
  id: string
  userId: string
  totalAmount: number
  startDate: string
  endDate: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
  updatedAt: string
  items: RentalItemType[]
  feedbacks: unknown[]
}

export type RentalResponseType = {
  data: RentalType[]
}

export const FeedbackInputSchema = z
  .object({
    rating: z
      .number()
      .min(1, { message: 'Rating phải từ 1 đến 5' })
      .max(5, { message: 'Rating phải từ 1 đến 5' })
      .refine((val) => val !== null, {
        message: 'Rating không được để trống',
      }),
    comment: z.string().min(1, 'Đánh giá không được để trống'),
    userId: z.string().min(1, 'User ID không hợp lệ').optional(),
    rentalId: z.string().min(1, 'Rental ID không hợp lệ').optional(),
  })
  .refine((data) => data.rating !== null, {
    message: 'Rating không được để trống',
    path: ['rating'], // Đảm bảo thông báo lỗi được áp dụng cho trường 'rating'
  })

export type FeedbackInputType = z.infer<typeof FeedbackInputSchema>

export const DamageReportInputSchema = z.object({
  equipmentId: z.string().min(1, 'Equipment ID không hợp lệ'),
  image: z.string().min(1, 'Ảnh không được để trống'),
  description: z.string().min(1, 'Mô tả không được để trống'),
})

export type DamageReportInputType = z.infer<typeof DamageReportInputSchema>

export type FeedbackType = {
  id: string
  rating: number
  comment: string
  adminResponse: string | null
  replyDate: string | null // ISO format string
  userId: string
  rentalId: string
  createdAt: string // ISO format string
  updatedAt: string // ISO format string
}

export type FeedbackByRentalIdResponseType = {
  data: FeedbackType[]
}

export const FeedbackItemInputSchema = z
  .object({
    rating: z
      .number()
      .min(1, { message: 'Rating phải từ 1 đến 5' })
      .max(5, { message: 'Rating phải từ 1 đến 5' })
      .refine((val) => val !== null, {
        message: 'Rating không được để trống',
      }),
    comment: z.string().min(1, 'Đánh giá không được để trống'),
    userId: z.string().min(1, 'User ID không hợp lệ').optional(),
    rentalItemId: z.string().min(1, 'Rental ID không hợp lệ').optional(),
  })
  .refine((data) => data.rating !== null, {
    message: 'Rating không được để trống',
    path: ['rating'], // Đảm bảo thông báo lỗi được áp dụng cho trường 'rating'
  })

export type FeedbackItemInputType = z.infer<typeof FeedbackItemInputSchema>

export type UserType = {
  id: string
  name: string
  email: string
  emailVerified: string
  password: string
  role: 'user' | 'admin' | 'super-admin'
  identityDoc: string
  phoneNumber: string
  dateOfBirth: string
  avatar: string
  gender: 'Nam' | 'Nữ' | 'Khác'
  statusIdentityDoc: 'verified' | 'unverified'
  createdAt: string
  updatedAt: string
}

export type ReviewType = {
  id: string
  rating: number
  comment: string
  adminResponse: string | null
  replyDate: string | null
  userId: string
  rentalId: string
  rentalItemId: string
  createdAt: string
  updatedAt: string
  rentalItem: RentalItemType
  user: UserType
}

// Mảng dữ liệu review
export type ReviewList = ReviewType[]
