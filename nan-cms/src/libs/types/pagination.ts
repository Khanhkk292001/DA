import { TypeOf, z } from 'zod'

export const PaginationSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
})

export type PaginationType = TypeOf<typeof PaginationSchema>
