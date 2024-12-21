import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type DamageReportType = {
  id: string
  description: string
  damageDate: string
  status: 'pending' | 'resolved' | 'rejected' // Trạng thái báo cáo
  image: string
  equipmentId: string
  userId: string
  createdAt: string
  updatedAt: string
}

export type DamageReportDetailType = {
  id?: string
  description?: string
  damageDate?: string
  status?: 'pending' | 'resolved' | 'rejected'
  image?: string
  equipmentId?: string
  userId?: string
  createdAt?: string
  updatedAt?: string
}

export type DamageReportListType = {
  data: DamageReportType[]
} & PaginationType

export type DamageReportSearchInputType = PaginationType & {
  status?: string
  page?: string
  next?: string
}

export type DamageReportListQueryInputType = DamageReportSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type DamageReportDetailResponseType = {
  data: DamageReportDetailType
}

export type QueryInputDamageReportDetailType = {
  damageReportId?: string
  sortBy?: string
  column?: string
}

export const DamageReportCreateInputSchema = z.object({
  description: z
    .string()
    .min(1, { message: 'Mô tả về hư hỏng là bắt buộc' })
    .max(1000, { message: 'Mô tả không được dài quá 1000 ký tự' }),
  damageDate: z.date().optional(),
  status: z.enum(['pending', 'resolved', 'rejected']).default('pending'),
  image: z.string().url({ message: 'Địa chỉ ảnh không hợp lệ' }).optional(),
  equipmentId: z.string().min(1, { message: 'ID thiết bị là bắt buộc' }),
  userId: z.string().min(1, { message: 'ID người báo hỏng là bắt buộc' }),
})

export const DamageReportUpdateInputSchema = DamageReportCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID báo cáo hư hỏng là bắt buộc' }),
})

export type DamageReportCreateInputType = TypeOf<typeof DamageReportCreateInputSchema>

export type DamageReportUpdateInputType = TypeOf<typeof DamageReportUpdateInputSchema>
