import { EquipmentListType } from '@/features/equipments'
import {
  QueryInputReturnDetailType,
  ReturnCreateInputType,
  ReturnDetailResponseType,
  ReturnListQueryInputType,
  ReturnListType,
  ReturnUpdateInputType,
} from '@/features/returns'
import request from '../config/axios'

export const getListReturns = async (params: ReturnListQueryInputType) => {
  const { page, limit, description, isFullyReturned } = params
  try {
    const response = await request.get<ReturnListType>('/returns/all/pagination', {
      params: {
        page,
        limit,
        description,
        isFullyReturned,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getEquipments() {
  const response = await request.get<EquipmentListType>(`/equipments/all`)

  return response.data.data
}

export const getReturn = async (id: string) => {
  try {
    const response = await request.get<ReturnDetailResponseType>(`/returns/get-by/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createReturn = async (data: ReturnCreateInputType) => {
  const returnData = {
    ...data,
  }

  try {
    const response = await request.post('/returns/create', returnData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateReturn = async (data: ReturnUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data

    const updatedData = {
      ...dataRequest,
    }

    const response = await request.patch(`/returns/update/${id}`, updatedData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getReturnDetail = async ({ column, returnId }: QueryInputReturnDetailType) => {
  try {
    const response = await request.get<ReturnDetailResponseType>(`/returns/get-by/${returnId}`, {
      params: {
        column,
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteReturn = async (returnId: string) => {
  try {
    const response = await request.delete(`/returns/remove/${returnId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getEquipmentValueLabels = async () => {
  try {
    const response = await request.get('/equipments/value-labels/equipment')
    return response.data
  } catch (error) {
    throw error
  }
}
