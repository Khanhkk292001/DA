import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type CategoryType = {
  id: string
  name: string
  description?: string
  equipments?: string[]
  createdAt?: string
  updatedAt?: string
}

export type CategoryDetailType = {
  id?: string
  name?: string
  description?: string
  equipments?: string[]
  createdAt?: string
  updatedAt?: string
}

export type CategoryListType = {
  data: CategoryType[]
} & PaginationType

export type CategorySearchInputType = PaginationType & {
  name?: string
}

export type CategoryListQueryInputType = CategorySearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type CategoryDetailResponseType = {
  data: CategoryDetailType
}

export type QueryInputCategoryDetailType = {
  categoryId?: string
  sortBy?: string
  column?: string
}

export const CategoryCreateInputSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Tên danh mục là bắt buộc' })
    .max(100, { message: 'Tên danh mục không được dài quá 100 ký tự' }),
  description: z.string().max(1000, { message: 'Mô tả không được dài quá 1000 ký tự' }).optional(),
  equipments: z.array(z.string()).optional(),
})

export const CategoryUpdateInputSchema = CategoryCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID danh mục là bắt buộc' }),
})

export type CategoryCreateInputType = TypeOf<typeof CategoryCreateInputSchema>

export type CategoryUpdateInputType = TypeOf<typeof CategoryUpdateInputSchema>
