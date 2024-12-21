import request from '../config/axios'
import { clearObjRequest } from '../hooks'

export const getMe = async () => {
  try {
    const response = await request.get<any>('/auth/me')
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateSelfInfo = async (data: any) => {
  try {
    const selfInfoData = clearObjRequest(data)
    const response = await request.put<any>('/me/update', selfInfoData)

    return response.data.data
  } catch (error) {
    throw error
  }
}
