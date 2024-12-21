import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type RepairRecordType = {
  id: string
  equipmentId: string
  repairDate: string
  failureCause: string
  partsReplaced?: string
  repairCost?: number
  warranty?: string
  createdAt?: string
  updatedAt?: string
}

export type RepairRecordDetailType = {
  id?: string
  equipmentId?: string
  repairDate?: string
  failureCause?: string
  partsReplaced?: string
  repairCost?: number
  warranty?: string
  createdAt?: string
  updatedAt?: string
}

export type RepairRecordListType = {
  data: RepairRecordType[]
} & PaginationType

export type RepairRecordSearchInputType = PaginationType & {
  filter?: string
  page?: string
  next?: string
}

export type RepairRecordListQueryInputType = RepairRecordSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type RepairRecordDetailResponseType = {
  data: RepairRecordDetailType
}

export type QueryInputRepairRecordDetailType = {
  repairRecordId?: string
  sortBy?: string
  column?: string
}
export const RepairRecordCreateInputSchema = z.object({
  equipmentId: z.string().min(1, { message: 'ID thiết bị là bắt buộc' }),
  repairDate: z.string().min(1, { message: 'Ngày sửa chữa là bắt buộc' }),
  failureCause: z.string().min(1, { message: 'Nguyên nhân hỏng hóc là bắt buộc' }),
  partsReplaced: z.string().optional(),
  repairCost: z.number().optional(),
  warranty: z.string().optional(),
})

export const RepairRecordUpdateInputSchema = RepairRecordCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID bản ghi sửa chữa là bắt buộc' }),
})

export type RepairRecordCreateInputType = TypeOf<typeof RepairRecordCreateInputSchema>

export type RepairRecordUpdateInputType = TypeOf<typeof RepairRecordUpdateInputSchema>
