import {
  EquipmentDetailResponseType,
  EquipmentListType,
  EquipmentUpdateInputType,
} from '@/features/equipments'
import {
  QueryInputReturnDetailType,
  ReturnCreateInputType,
  ReturnDetailResponseType,
  ReturnListQueryInputType,
  ReturnListType,
} from '@/features/returns'
import request from '../config/axios'

export const getListReturns = async (params: ReturnListQueryInputType) => {
  const { page, limit, description } = params
  try {
    const response = await request.get<ReturnListType>('/returns/all/pagination', {
      params: {
        page,
        limit,
        description,
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

export const getEquipment = async (id: string) => {
  try {
    const response = await request.get<EquipmentDetailResponseType>(`/equipments/get-by/${id}`)
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

export const updateEquipment = async (data: EquipmentUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data

    const updatedData = {
      ...dataRequest,
    }

    const response = await request.patch(`/equipments/update/${id}`, updatedData)
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

export const deleteEquipment = async (equipmentId: string) => {
  try {
    const response = await request.delete(`/equipments/remove/${equipmentId}`)
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
