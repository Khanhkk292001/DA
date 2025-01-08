import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type EquipmentType = {
  id: string
  name: string
  image: string
  description?: string
  basePrice?: number
  rentalPrice?: number
  stock?: number
  categoryId: string
  category?: string
  createdAt?: string
  updatedAt?: string
  equipmentId?: string
  maintainCount: number
}

export type EquipmentDetailType = EquipmentType & {
  cartItems?: string[]
  rentalItems?: string[]
  packages?: string[]
  maintenances?: string[]
}

export type EquipmentListType = {
  data: EquipmentType[]
} & PaginationType

export type EquipmentSearchInputType = PaginationType & {
  name?: string
  categoryId?: string
  filter?: string
}

export type EquipmentListQueryInputType = EquipmentSearchInputType & {
  sortBy?: 'asc' | 'desc'
}

export type EquipmentDetailResponseType = {
  data: EquipmentDetailType
}

export type QueryInputEquipmentDetailType = {
  equipmentId?: string
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

export const EquipmentUpdateInputSchema = ReturnCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID đơn mua là bắt buộc' }),
})

export type ReturnCreateInputType = TypeOf<typeof ReturnCreateInputSchema>
export type EquipmentUpdateInputType = TypeOf<typeof EquipmentUpdateInputSchema>
