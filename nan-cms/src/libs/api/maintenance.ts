import {
  MaintenanceCreateInputType,
  MaintenanceDetailResponseType,
  MaintenanceListQueryInputType,
  MaintenanceListType,
  MaintenanceUpdateInputType,
  QueryInputMaintenanceDetailType,
} from '@/features/maintenances'
import request from '../config/axios'

export const getListMaintenances = async (params: MaintenanceListQueryInputType) => {
  const { page, limit, status } = params
  try {
    const response = await request.get<MaintenanceListType>('/maintenances/all/pagination', {
      params: {
        page,
        limit,
        status,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getMaintenance = async (id: string) => {
  try {
    const response = await request.get<MaintenanceDetailResponseType>(`/maintenances/get-by/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createMaintenance = async (data: MaintenanceCreateInputType) => {
  const maintenanceData = {
    ...data,
  }

  try {
    const response = await request.post('/maintenances/create', maintenanceData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateMaintenance = async (data: MaintenanceUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data

    const updatedData = {
      ...dataRequest,
    }

    const response = await request.patch(`/maintenances/update/${id}`, updatedData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getMaintenanceDetail = async ({
  column,
  maintenanceId,
}: QueryInputMaintenanceDetailType) => {
  try {
    const response = await request.get<MaintenanceDetailResponseType>(
      `/maintenances/get-by/${maintenanceId}`,
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

export const deleteMaintenance = async (maintenanceId: string) => {
  try {
    const response = await request.delete(`/maintenances/remove/${maintenanceId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getMaintenanceValueLabels = async () => {
  try {
    const response = await request.get('/maintenances/value-labels/maintenance')
    return response.data
  } catch (error) {
    throw error
  }
}
