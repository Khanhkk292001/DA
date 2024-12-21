import { TypeOf, z } from 'zod'

export const SigninInputSchema = z.object({
  email: z.string().trim(),
  password: z.string().trim(),
})

const UserInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
})

export const SigninOutputSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  user: UserInfoSchema,
})

export const UserResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
})

export type SigninInputType = TypeOf<typeof SigninInputSchema>
export type AdminInfoType = TypeOf<typeof UserInfoSchema>
export type SigninOutputType = TypeOf<typeof SigninOutputSchema>
export type UserResponseType = TypeOf<typeof UserResponseSchema>
