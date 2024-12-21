import {
  QueryInputUsageRecordDetailType,
  UsageRecordCreateInputType,
  UsageRecordDetailResponseType,
  UsageRecordListQueryInputType,
  UsageRecordListType,
  UsageRecordUpdateInputType,
} from '@/features/usage-records'
import request from '../config/axios'

export const getListUsageRecords = async (params: UsageRecordListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<UsageRecordListType>('/usage-records/all/pagination', {
      params: {
        page,
        limit,
        filter,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUsageRecord = async (id: string) => {
  try {
    const response = await request.get<UsageRecordDetailResponseType>(`/usage-records/get-by/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createUsageRecord = async (data: UsageRecordCreateInputType) => {
  const usageRecordData = {
    ...data,
  }

  try {
    const response = await request.post('/usage-records/create', usageRecordData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateUsageRecord = async (data: UsageRecordUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data

    const updatedData = {
      ...dataRequest,
    }

    const response = await request.patch(`/usage-records/update/${id}`, updatedData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUsageRecordDetail = async ({
  column,
  usageRecordId,
}: QueryInputUsageRecordDetailType) => {
  try {
    const response = await request.get<UsageRecordDetailResponseType>(
      `/usage-records/get-by/${usageRecordId}`,
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

export const deleteUsageRecord = async (recordId: string) => {
  try {
    const response = await request.delete(`/usage-records/remove/${recordId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUsageRecordValueLabels = async () => {
  try {
    const response = await request.get('/usage-records/all/label-value')
    return response.data
  } catch (error) {
    throw error
  }
}
