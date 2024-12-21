import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'
import { EquipmentType } from '../equipments'

export type EquipmentPackageType = {
  id: string
  name: string
  description: string
  rentalPrice: number
  basePrice: number
  equipments: EquipmentType[]
  createdAt?: string
  updatedAt?: string
  image: string
}

export type EquipmentPackageDetailType = EquipmentPackageType & {
  cartItems?: string[]
  rentalItems?: string[]
}

export type EquipmentPackageListType = {
  data: EquipmentPackageType[]
} & PaginationType

export type EquipmentPackageSearchInputType = PaginationType & {
  name?: string
  categoryId?: string
}

export type EquipmentPackageListQueryInputType = EquipmentPackageSearchInputType & {
  sortBy?: 'asc' | 'desc'
}

export type EquipmentPackageDetailResponseType = {
  data: EquipmentPackageDetailType
}

export type QueryInputEquipmentPackageDetailType = {
  packageId?: string
  column?: string
}

export const EquipmentPackageCreateInputSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Tên gói thiết bị là bắt buộc' })
    .max(100, { message: 'Tên gói không được dài quá 100 ký tự' }),
  description: z
    .string()
    .min(10, { message: 'Mô tả phải có ít nhất 10 ký tự' })
    .max(1000, { message: 'Mô tả không được dài quá 1000 ký tự' }),
  basePrice: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === 'string' ? parseFloat(val) : val))
    .refine((val) => !isNaN(val) && val > 0, { message: 'Giá theo ngày phải là số dương' })
    .optional(),

  rentalPrice: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === 'string' ? parseFloat(val) : val))
    .refine((val) => !isNaN(val) && val > 0, { message: 'Giá theo tuần phải là số dương' })
    .optional(),

  image: z.string().optional(),
  equipmentIds: z.array(z.string()),
})

export const EquipmentPackageUpdateInputSchema = EquipmentPackageCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID gói thiết bị là bắt buộc' }),
})

export type EquipmentPackageCreateInputType = TypeOf<typeof EquipmentPackageCreateInputSchema>
export type EquipmentPackageUpdateInputType = TypeOf<typeof EquipmentPackageUpdateInputSchema>
