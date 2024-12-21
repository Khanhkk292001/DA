import {
  EquipmentPackageCreateInputType,
  EquipmentPackageDetailResponseType,
  EquipmentPackageListQueryInputType,
  EquipmentPackageListType,
  EquipmentPackageUpdateInputType,
  QueryInputEquipmentPackageDetailType,
} from '@/features/equipment-packages'
import { EquipmentListQueryInputType, EquipmentListType } from '@/features/equipments'
import request from '../config/axios'

export const getListEquipmentsPackage = async (params: EquipmentPackageListQueryInputType) => {
  const { page, limit, name } = params
  try {
    const response = await request.get<EquipmentPackageListType>(
      '/equipments-package/all/pagination',
      {
        params: {
          page,
          limit,
          name,
        },
      },
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const getEquipmentPackage = async (id: string) => {
  try {
    const response = await request.get<EquipmentPackageDetailResponseType>(
      `/equipments-package/get-by/${id}`,
    )
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createEquipmentPackage = async (data: EquipmentPackageCreateInputType) => {
  const packageData = {
    ...data,
  }

  try {
    const response = await request.post('/equipments-package/create', packageData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateEquipmentPackage = async (data: EquipmentPackageUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data

    const updatedData = {
      ...dataRequest,
    }

    const response = await request.patch(`/equipments-package/update/${id}`, updatedData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getEquipmentPackageDetail = async ({
  column,
  packageId,
}: QueryInputEquipmentPackageDetailType) => {
  try {
    const response = await request.get<EquipmentPackageDetailResponseType>(
      `/equipments-package/get-by/${packageId}`,
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

export const deleteEquipmentPackage = async (packageId: string) => {
  try {
    const response = await request.delete(`/equipments-package/remove/${packageId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getEquipmentPackageValueLabels = async () => {
  try {
    const response = await request.get('/equipments-package/value-labels/package')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getListEquipmentsByPackage = async (
  id: string,
  params: EquipmentListQueryInputType,
): Promise<EquipmentListType> => {
  const { page, limit, name } = params
  try {
    const response = await request.get<EquipmentListType>(
      `/equipments-package/${id}/equipments/all/pagination`,
      {
        params: {
          page,
          limit,
          name,
        },
      },
    )
    return response.data
  } catch (error) {
    throw error
  }
}
