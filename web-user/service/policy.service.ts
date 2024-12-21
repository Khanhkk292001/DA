import { PolicyResponseType } from '@/features/policy/type'
import request from '@/libs/configs/axios/axios'

export const getPolicies = async () => {
  const response = await request.get<PolicyResponseType>('/policies/all')

  return response.data.data
}
