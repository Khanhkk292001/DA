import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type ReturnType = {
  id: string
  name: string
  image: string
  description?: string
  basePrice?: number
  rentalPrice?: number
  stock?: number
  rentalId: string
  category?: string
  createdAt?: string
  updatedAt?: string
  equipmentId?: string
  maintainCount: number
  isFullyReturned: boolean
}

export type ReturnDetailType = ReturnType & {
  cartItems?: string[]
  rentalItems?: string[]
  packages?: string[]
  maintenances?: string[]
}

export type ReturnListType = {
  data: ReturnDetailType[]
} & PaginationType

export type ReturnSearchInputType = PaginationType & {
  description?: string
  categoryId?: string
  filter?: string
  isFullyReturned: string
}

export type ReturnListQueryInputType = ReturnSearchInputType & {
  sortBy?: 'asc' | 'desc'
}

export type ReturnDetailResponseType = {
  data: ReturnDetailType
}

export type QueryInputReturnDetailType = {
  returnId?: string
  column?: string
}

export const ReturnCreateInputSchema = z.object({
  description: z
    .string()
    .min(10, { message: 'Mô tả phải có ít nhất 10 ký tự' })
    .max(1000, { message: 'Mô tả không được dài quá 1000 ký tự' }),

  rentalId: z.string().min(1, { message: 'ID đơn mua là bắt buộc' }),

  isFullyReturned: z.boolean().default(true),
})

export const ReturnUpdateInputSchema = ReturnCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID đơn mua là bắt buộc' }),
})

export type ReturnCreateInputType = TypeOf<typeof ReturnCreateInputSchema>
export type ReturnUpdateInputType = TypeOf<typeof ReturnUpdateInputSchema>
