import { UpdateIntentInputType, UpdateUserInputType } from '@/features/profile/type'
import request from '@/libs/configs/axios/axios'

export const updateInformation = async (data: UpdateUserInputType) => {
  const response = await request.patch(`/users/update/profile`, data)

  return response.data
}

export const updateIdentityDoc = async (data: UpdateIntentInputType) => {
  const response = await request.patch('/users/update/identity-doc', data)

  return response.data
}
