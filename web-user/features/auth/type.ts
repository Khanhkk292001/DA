import { z } from 'zod'

// SCHEMA
export const LoginInputSchema = z.object({
  email: z.string().email().min(1),
  password: z.string(),
})

export const RegisterInputSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Tên phải chứa ít nhất 3 ký tự.' })
      .max(255, { message: 'Tên không được dài quá 255 ký tự.' })
      .trim(),
    email: z
      .string()
      .email({ message: 'Email không hợp lệ.' })
      .max(255, { message: 'Email không được dài quá 255 ký tự.' }),
    password: z
      .string()
      .min(6, { message: 'Mật khẩu phải chứa ít nhất 6 ký tự.' })
      .max(255, { message: 'Mật khẩu không được dài quá 255 ký tự.' })
      .regex(/[A-Z]/, { message: 'Mật khẩu phải chứa ít nhất một chữ cái in hoa.' })
      .regex(/[a-z]/, { message: 'Mật khẩu phải chứa ít nhất một chữ cái thường.' })
      .regex(/\d/, { message: 'Mật khẩu phải chứa ít nhất một chữ số.' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt.' }),
    passwordconf: z
      .string()
      .min(6, { message: 'Xác nhận mật khẩu phải chứa ít nhất 6 ký tự.' })
      .max(255, { message: 'Xác nhận mật khẩu không được dài quá 255 ký tự.' }),
  })
  .refine((data) => data.password === data.passwordconf, {
    message: 'Mật khẩu và xác nhận mật khẩu không khớp.',
    path: ['passwordconf'], // Đặt lỗi tại trường passwordconf
  })

export enum IdentityDocStatus {
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

// TYPE
export type UserType = {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  phoneNumber: string
  dateOfBirth: string
  gender: string
  identityDoc: string
  statusIdentityDoc: IdentityDocStatus | null
}

export type LoginResponseType = {
  user: UserType
  token: string
}

export type MeResponseType = {
  data: UserType
}

export type RegisterInputType = z.infer<typeof RegisterInputSchema>
export type LoginInputType = z.infer<typeof LoginInputSchema>
