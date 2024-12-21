import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type PolicyType = {
  id: string
  description: string
  depositRate: number
  damageProcessingFee: number
  createdAt?: string
  updatedAt?: string
}

export type PolicyDetailType = {
  id?: string
  description?: string
  depositRate?: number
  damageProcessingFee?: number
  createdAt?: string
  updatedAt?: string
}

export type PolicyListType = {
  data: PolicyType[]
} & PaginationType

export type PolicySearchInputType = PaginationType & {
  damageProcessingFee?: string
  page?: string
  next?: string
}

export type PolicyListQueryInputType = PolicySearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type PolicyDetailResponseType = {
  data: PolicyDetailType
}

export type QueryInputPolicyDetailType = {
  policyId?: string
  sortBy?: string
  column?: string
}

export const PolicyCreateInputSchema = z.object({
  description: z
    .string()
    .min(1, { message: 'Mô tả chính sách là bắt buộc' })
    .max(1000, { message: 'Mô tả không được dài quá 1000 ký tự' }),
  depositRate: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === 'string' ? parseFloat(val) : val))
    .refine((val) => !isNaN(val) && val > 0, { message: 'Phải là số dương' })
    .optional(),
  damageProcessingFee: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === 'string' ? parseFloat(val) : val))
    .refine((val) => !isNaN(val) && val > 0, { message: 'Phải là số dương' })
    .optional(),
})

export const PolicyUpdateInputSchema = PolicyCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID chính sách là bắt buộc' }),
})

export type PolicyCreateInputType = TypeOf<typeof PolicyCreateInputSchema>

export type PolicyUpdateInputType = TypeOf<typeof PolicyUpdateInputSchema>
