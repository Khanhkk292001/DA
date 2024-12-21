import { UserListQueryInputType, UserListType } from '@/features/user'
import {
  QueryInputUserDetailType,
  UserDetailResponseType,
  UserUpdateInputType,
} from '@/features/user/type'
import request from '../config/axios'
import { clearObjRequest } from '../hooks'

export const getListUsers = async (params: UserListQueryInputType) => {
  const { page, limit, filter, statusIdentityDoc } = params
  try {
    const response = await request.get<UserListType>('/users/all/pagination', {
      params: {
        page,
        limit,
        filter,
        statusIdentityDoc
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUser = async (id: string) => {
  try {
    const response = await request.get<UserDetailResponseType>(`/user/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateUser = async (data: UserUpdateInputType) => {
  try {
    const { id, name, email, ...dataRequest } = data
    const cleanedRequest = clearObjRequest({
      ...dataRequest,
    })

    const response = await request.put(`/user/${id}`, {
      ...cleanedRequest,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserDetail = async ({ userId }: QueryInputUserDetailType) => {
  try {
    const response = await request.get<UserDetailResponseType>(`/users/${userId}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const response = await request.delete(`/user/${userId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateIndentityDocStatus = async ({
  userId,
  status,
}: {
  userId: string
  status: string
}) => {
  try {
    const response = await request.patch(`/users/${userId}/identity-doc-status`, {
      statusIdentityDoc: status,
    })
    return response.data
  } catch (error) {
    throw error
  }
}
