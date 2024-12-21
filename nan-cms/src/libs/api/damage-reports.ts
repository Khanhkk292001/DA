import {
  DamageReportCreateInputType,
  DamageReportDetailResponseType,
  DamageReportListQueryInputType,
  DamageReportListType,
  DamageReportUpdateInputType,
  QueryInputDamageReportDetailType,
} from '@/features/damage-reports'
import request from '../config/axios'

export const getListDamageReports = async (params: DamageReportListQueryInputType) => {
  const { page, limit, status } = params
  try {
    const response = await request.get<DamageReportListType>('/damage-reports/all/pagination', {
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

export const getDamageReport = async (id: string) => {
  try {
    const response = await request.get<DamageReportDetailResponseType>(
      `/damage-reports/get-by/${id}`,
    )
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const getDamageReportById = async (id: string) => {
  try {
    const response = await request.get<DamageReportDetailResponseType>(
      `/damage-reports/get-by/${id}`,
    )
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createDamageReport = async (data: DamageReportCreateInputType) => {
  const damageReportData = {
    ...data,
  }

  try {
    const response = await request.post('/damage-reports/create', damageReportData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateDamageReport = async (data: DamageReportUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data

    const updatedData = {
      ...dataRequest,
    }

    const response = await request.patch(`/damage-reports/update/${id}`, updatedData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getDamageReportDetail = async ({
  column,
  damageReportId,
}: QueryInputDamageReportDetailType) => {
  try {
    const response = await request.get<DamageReportDetailResponseType>(
      `/damage-reports/get-by/${damageReportId}`,
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

export const deleteDamageReport = async (damageReportId: string) => {
  try {
    const response = await request.delete(`/damage-reports/remove/${damageReportId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getDamageReportValueLabels = async () => {
  try {
    const response = await request.get('/damage-reports/all/label-value')
    return response.data
  } catch (error) {
    throw error
  }
}
