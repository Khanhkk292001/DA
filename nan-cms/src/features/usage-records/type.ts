import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type UsageRecordType = {
  id: string
  equipmentId: string
  rentalId?: string
  rentalDate: string
  returnDate?: string
  usageDuration: number
  incidents?: string
  createdAt?: string
  updatedAt?: string
}

export type UsageRecordDetailType = {
  id?: string
  equipmentId?: string
  rentalId?: string
  rentalDate?: string
  returnDate?: string
  usageDuration?: number
  incidents?: string
  createdAt?: string
  updatedAt?: string
}

export type UsageRecordListType = {
  data: UsageRecordType[]
} & PaginationType

export type UsageRecordSearchInputType = PaginationType & {
  filter?: string
  equipmentId?: string
  rentalId?: string
  page?: string
  next?: string
}

export type UsageRecordListQueryInputType = UsageRecordSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type UsageRecordDetailResponseType = {
  data: UsageRecordDetailType
}

export type QueryInputUsageRecordDetailType = {
  usageRecordId?: string
  sortBy?: string
  column?: string
}

export const UsageRecordCreateInputSchema = z.object({
  equipmentId: z.string().min(1, { message: 'Mã thiết bị là bắt buộc' }),
  rentalDate: z.date(),
  returnDate: z.date().optional(),
  usageDuration: z.number().min(1, { message: 'Thời gian sử dụng phải lớn hơn 0' }),
  incidents: z
    .string()
    .max(1000, { message: 'Mô tả sự cố không được dài quá 1000 ký tự' })
    .optional(),
  rentalId: z.string().optional(),
})

export const UsageRecordUpdateInputSchema = UsageRecordCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID bản ghi là bắt buộc' }),
})

export type UsageRecordCreateInputType = TypeOf<typeof UsageRecordCreateInputSchema>
export type UsageRecordUpdateInputType = TypeOf<typeof UsageRecordUpdateInputSchema>
