import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type MaintenanceType = {
  id: string
  maintenanceDate: string
  description?: string
  suggestedNextMaintenance?: string
  status: 'pending' | 'completed'
  maintenanceCost?: number
  equipmentId: string
  createdAt?: string
  updatedAt?: string
}

export type MaintenanceDetailType = {
  id?: string
  maintenanceDate?: string
  description?: string
  suggestedNextMaintenance?: string
  status?: 'pending' | 'completed'
  maintenanceCost?: number
  equipmentId?: string
  createdAt?: string
  updatedAt?: string
}

export type MaintenanceListType = {
  data: MaintenanceType[]
} & PaginationType

export type MaintenanceSearchInputType = PaginationType & {
  status?: string
  page?: string
  next?: string
}

export type MaintenanceListQueryInputType = MaintenanceSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type MaintenanceDetailResponseType = {
  data: MaintenanceDetailType
}

export type QueryInputMaintenanceDetailType = {
  maintenanceId?: string
  sortBy?: string
  column?: string
}

export const MaintenanceCreateInputSchema = z.object({
  maintenanceDate: z.preprocess(
    (value) => (value instanceof Date ? value.toISOString() : value),
    z.string().nonempty({ message: 'Ngày bảo trì là bắt buộc' }),
  ),
  description: z
    .string()
    .min(10, { message: 'Mô tả phải có ít nhất 10 ký tự' })
    .max(1000, { message: 'Mô tả không được dài quá 1000 ký tự' })
    .optional(),
  suggestedNextMaintenance: z
    .string()
    .optional()
    .refine((val) => (val ? !isNaN(Date.parse(val)) : true), {
      message: 'Ngày đề xuất bảo trì tiếp theo phải là định dạng ngày hợp lệ',
    }),
  status: z.enum(['pending', 'completed']).default('pending'),
  maintenanceCost: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === 'string' ? parseFloat(val) : val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: 'Chi phí bảo trì',
    })
    .optional(),
  equipmentId: z.string().nonempty({ message: 'ID thiết bị là bắt buộc' }),
})

export const MaintenanceUpdateInputSchema = MaintenanceCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID bảo trì là bắt buộc' }),
})

export type MaintenanceCreateInputType = TypeOf<typeof MaintenanceCreateInputSchema>

export type MaintenanceUpdateInputType = TypeOf<typeof MaintenanceUpdateInputSchema>
