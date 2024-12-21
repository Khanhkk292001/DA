import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export enum Role {
  User = 'user',
  Admin = 'admin',
  SuperAdmin = 'super_admin',
}

export type UserType = {
  id: string
  name: string
  email: string
  phoneNumber?: string
  gender: string
  birthOfDate: string
  statusIdentityDoc: string
  emailVerified?: string
  role: Role
  identityDoc?: string
  rentals?: string[]
  feedbacks?: string[]
  cart?: string
  notifications?: string[]
  paymentMethods?: string[]
  supports?: string[]
  createdAt?: string
  updatedAt?: string
}

export type UserDetailType = {
  id?: string
  name?: string
  email?: string
  emailVerified?: string
  role?: Role
  identityDoc?: string
  statusIdentityDoc: string
  phoneNumber?: string
  gender?: string
  rentals?: string[]
  feedbacks?: string[]
  cart?: string
  notifications?: string[]
  paymentMethods?: string[]
  supports?: string[]
  createdAt?: string
  updatedAt?: string
}

export type UserListType = {
  data: UserType[]
} & PaginationType

export type UserSearchInputType = PaginationType & {
  filter?: string
  page?: string
  next?: string
}

export type UserListQueryInputType = UserSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
  statusIdentityDoc:string
}

export type UserDetailResponseType = {
  data: UserDetailType
}

export type QueryInputUserDetailType = {
  userId?: string
  sortBy?: string
  column?: string
}

export const UserCreateInputSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Tên người dùng là bắt buộc' })
    .max(100, { message: 'Tên người dùng không được dài quá 100 ký tự' }),
  email: z.string().email({ message: 'Địa chỉ email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
  role: z.nativeEnum(Role).optional(),
  identityDoc: z.string().optional(),
  rentals: z.array(z.string()).optional(),
  feedbacks: z.array(z.string()).optional(),
  cart: z.string().optional(),
  notifications: z.array(z.string()).optional(),
  paymentMethods: z.array(z.string()).optional(),
  supports: z.array(z.string()).optional(),
})

export type UserCreateInputType = TypeOf<typeof UserCreateInputSchema>

export type UserUpdateInputType = TypeOf<typeof UserUpdateInputSchema>

export const UserUpdateInputSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, { message: 'Tên người dùng là bắt buộc' })
    .max(100, { message: 'Tên người dùng không được dài quá 100 ký tự' }),
  email: z.string().email({ message: 'Địa chỉ email không hợp lệ' }),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  birthOfDate: z.string().optional(),
})

export const UserUpdateIndentityDocSchema = z.object({
  status: z.string(),
})

export type UserUpdateIndentityDocType = TypeOf<typeof UserUpdateIndentityDocSchema>
