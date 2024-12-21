import {
  QueryInputRepairRecordDetailType,
  RepairRecordCreateInputType,
  RepairRecordDetailResponseType,
  RepairRecordListQueryInputType,
  RepairRecordListType,
  RepairRecordUpdateInputType,
} from '@/features/repair-records'
import request from '../config/axios'

export const getListRepairRecords = async (params: RepairRecordListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<RepairRecordListType>('/usage-records/all/pagination', {
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

export const getRepairRecord = async (id: string) => {
  try {
    const response = await request.get<RepairRecordDetailResponseType>(
      `/repair-records/get-by/${id}`,
    )
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createRepairRecord = async (data: RepairRecordCreateInputType) => {
  const repairRecordData = {
    ...data,
  }

  try {
    const response = await request.post('/repair-records/create', repairRecordData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateRepairRecord = async (data: RepairRecordUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data

    const updatedData = {
      ...dataRequest,
    }

    const response = await request.patch(`/repair-records/update/${id}`, updatedData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getRepairRecordDetail = async ({
  column,
  repairRecordId,
}: QueryInputRepairRecordDetailType) => {
  try {
    const response = await request.get<RepairRecordDetailResponseType>(
      `/repair-records/get-by/${repairRecordId}`,
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

export const deleteRepairRecord = async (recordId: string) => {
  try {
    const response = await request.delete(`/repair-records/remove/${recordId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getRepairRecordValueLabels = async () => {
  try {
    const response = await request.get('/repair-records/all/label-value')
    return response.data
  } catch (error) {
    throw error
  }
}
