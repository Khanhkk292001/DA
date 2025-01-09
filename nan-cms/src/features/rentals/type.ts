import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type RentalType = {
  id: string
  userId: string
  totalAmount?: number
  startDate?: string
  endDate?: string
  status: RentalStatusType
  feedbacks?: string[]
  items?: RentalItemType[]
  createdAt?: string
  updatedAt?: string
}

export type RentalDetailType = {
  id?: string
  userId?: string
  totalAmount?: number
  startDate?: string
  endDate?: string
  status?: RentalStatusType
  feedbacks?: string[]
  items?: RentalItemType[]
  createdAt?: string
  updatedAt?: string
}

export type RentalListType = {
  data: RentalType[]
} & PaginationType

export type RentalSearchInputType = PaginationType & {
  status?: string
  isFullyReturned?: string
  page?: string
  next?: string
}

export type RentalListQueryInputType = RentalSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type RentalDetailResponseType = {
  data: RentalDetailType
}

export type QueryInputRentalDetailType = {
  rentalId?: string
  sortBy?: string
  column?: string
}

export type RentalStatusType = 'pending' | 'active' | 'confirmed' | 'canceled'

export type RentalItemType = {
  id: string
  name: string
  description?: string
  quantity: number
}

export const RentalCreateInputSchema = z.object({
  userId: z.string().min(1, { message: 'User ID là bắt buộc' }),
  totalAmount: z.number().positive({ message: 'Số tiền phải lớn hơn 0' }).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(['pending', 'active', 'completed', 'canceled']).optional(),
  items: z
    .array(
      z.object({
        id: z.string().min(1, { message: 'ID của mục là bắt buộc' }),
        name: z.string().min(1, { message: 'Tên của mục là bắt buộc' }),
        description: z.string().optional(),
        quantity: z.number().min(1, { message: 'Số lượng phải ít nhất là 1' }),
      }),
    )
    .optional(),
  feedbacks: z.array(z.string()).optional(),
})

export const RentalUpdateInputSchema = RentalCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID Rental là bắt buộc' }),
})

export type RentalCreateInputType = TypeOf<typeof RentalCreateInputSchema>

export type RentalUpdateInputType = TypeOf<typeof RentalUpdateInputSchema>

type User = {
  id: string
  name: string
  email: string
  emailVerified: string
  password: string
  role: 'user' | 'admin'
  identityDoc: string
  phoneNumber: string
  dateOfBirth: string
  avatar: string
  gender: 'Nam' | 'Nữ'
  statusIdentityDoc: 'verified' | 'unverified'
  createdAt: string
  updatedAt: string
}

type Equipment = {
  id: string
  name: string
  image: string
  description: string
  basePrice: number
  rentalPrice: number
  stock: number
  categoryId: string
  createdAt: string
  updatedAt: string
}

type RentalItem = {
  id: string
  rentalId: string
  equipmentId: string
  packageId: string | null
  quantity: number
  durationType: 'day' | 'hour' // assuming "day" or "hour" as duration types
  durationValue: number
  price: number
  createdAt: string
  updatedAt: string
  equipment: Equipment
  package: any // You can define the package type if available
}

export type Rental = {
  id: string
  userId: string
  totalAmount: number
  startDate: string
  endDate: string
  status: 'confirmed' | 'canceled' | 'pending' // List possible status
  address: string | null
  createdAt: string
  updatedAt: string
  user: User
  items: RentalItem[]
}

export type RentalDetail = {
  data: Rental
}

type Review = {
  id: string
  rating: number
  comment: string
  adminResponse: string | null
  replyDate: string | null
  userId: string
  rentalId: string
  createdAt: string
  updatedAt: string
}

export type ReviewsResponse = {
  data: Review[]
}
