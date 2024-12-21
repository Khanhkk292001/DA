import { SigninInputType, SigninOutputType } from '@/features/auth'
import request from '../config/axios'

export const signin = async ({ email, password }: SigninInputType) => {
  try {
    const res = await request.post<SigninOutputType>('/auth/login', {
      email,
      password,
    })
    return res
  } catch (err) {
    throw err
  }
}

export const logout = async () => {
  try {
    await request.post('/auth/logout')
  } catch (error) {
    console.log(error)
  }
}
