import { UserResponseType } from '@/features/auth'
import request from '../config/axios'
import { clearObjRequest } from '../hooks'

export const listAdmin = async (params: any) => {
  try {
    const response = await request.get<any>('/list', {
      params,
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const createAdmin = async (data: any) => {
  try {
    const response = await request.post(`/registration`, data)

    return response
  } catch (error) {
    throw error
  }
}

export const deleteAdmins = async (ids: string[]) => {
  try {
    const response = await request.post('/delete', {
      ids,
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const updateAdmin = async (data: any) => {
  try {
    const { id, ...dataUpdate } = data
    const adminData = clearObjRequest(dataUpdate)

    const response = await request.put(`/update/${id}`, adminData)

    return response
  } catch (error) {
    throw error
  }
}

export const getAdmin = async (id: string) => {
  try {
    const response = await request.get<UserResponseType>(`/show/${id}`)

    return response.data.data
  } catch (error) {
    throw error
  }
}
