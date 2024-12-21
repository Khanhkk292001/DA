import {
  EquipmentCreateInputType,
  EquipmentDetailResponseType,
  EquipmentListQueryInputType,
  EquipmentListType,
  EquipmentUpdateInputType,
  QueryInputEquipmentDetailType,
} from '@/features/equipments'
import request from '../config/axios'

export const getListEquipments = async (params: EquipmentListQueryInputType) => {
  const { page, limit, name } = params
  try {
    const response = await request.get<EquipmentListType>('/equipments/all/pagination', {
      params: {
        page,
        limit,
        name,
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

export const createEquipment = async (data: EquipmentCreateInputType) => {
  const equipmentData = {
    ...data,
  }

  try {
    const response = await request.post('/equipments/create', equipmentData)
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

export const getEquipmentDetail = async ({
  column,
  equipmentId,
}: QueryInputEquipmentDetailType) => {
  try {
    const response = await request.get<EquipmentDetailResponseType>(
      `/equipments/get-by/${equipmentId}`,
      {
        params: {
          column,
        },
      },
    )
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
