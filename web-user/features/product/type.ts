import { z } from 'zod'

export const CartInputSchema = z.object({
  equipmentId: z.string().optional(),
  packageId: z.string().optional(),
  quantity: z.number().int().min(0, 'quantity phải là số nguyên không âm'),
  price: z.number().optional(),
})

export type CartInputType = z.infer<typeof CartInputSchema>
