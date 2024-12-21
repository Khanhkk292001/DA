import { z } from 'zod'

export const UpdateUserInputSchema = z.object({
  name: z.string().min(1, 'Name không được để trống'),
  email: z.string().email('Email không hợp lệ'),
  phoneNumber: z.string().min(1, 'Số điện thoại không được để trống'),
  dateOfBirth: z.string().min(1, 'Ngày sinh không được để trống').or(z.date()),
  avatar: z.string().min(1, 'Avatar không được để trống'),
  gender: z.string().min(1, 'Giới tính không được để trống'),
})

export type UpdateUserInputType = z.infer<typeof UpdateUserInputSchema>

export const UpdateIntentInputSchema = z.object({
  identityDoc: z.string().min(1, 'CMND không được để trống'),
})

export type UpdateIntentInputType = z.infer<typeof UpdateIntentInputSchema>
