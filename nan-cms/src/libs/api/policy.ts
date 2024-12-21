import {
  PolicyCreateInputType,
  PolicyDetailResponseType,
  PolicyListQueryInputType,
  PolicyListType,
  PolicyUpdateInputType,
  QueryInputPolicyDetailType,
} from '@/features/policies'
import request from '../config/axios'

export const getListPolicies = async (params: PolicyListQueryInputType) => {
  const { page, limit, damageProcessingFee } = params
  try {
    const response = await request.get<PolicyListType>('/policies/all/pagination', {
      params: {
        page,
        limit,
        damageProcessingFee,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getPolicy = async (id: string) => {
  try {
    const response = await request.get<PolicyDetailResponseType>(`/policies/get-by/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createPolicy = async (data: PolicyCreateInputType) => {
  const policyData = {
    ...data,
  }

  try {
    const response = await request.post('/policies/create', policyData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updatePolicy = async (data: PolicyUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data

    console.log(data)

    const updatedData = {
      ...dataRequest,
    }

    const response = await request.patch(`/policies/update/${id}`, updatedData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getPolicyDetail = async ({ column, policyId }: QueryInputPolicyDetailType) => {
  try {
    const response = await request.get<PolicyDetailResponseType>(`/policies/get-by/${policyId}`, {
      params: {
        column,
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deletePolicy = async (policyId: string) => {
  try {
    const response = await request.delete(`/policies/remove/${policyId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getPolicyValueLabels = async () => {
  try {
    const response = await request.get('/policies/value-labels/policy')
    return response.data
  } catch (error) {
    throw error
  }
}
