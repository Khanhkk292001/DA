import { CategoryResponseData, EquipmentDetailType, EquipmentResponseType, ProductList } from '@/features'
import { FeedbackByRentalIdResponseType, ReviewList } from '@/features/history-rental/type'
import request from '@/libs/configs/axios/axios'

export async function getAllDevice() {
  const response = await request.get<EquipmentResponseType>(`/equipments/all/pagination`)

  return response.data.data
}

export async function getDeviceById(id: string) {
  const response = await request.get<EquipmentDetailType>(`/equipments/get-by/${id}`)

  return response.data.data
}

export async function getAllPackage() {
  const response = await request.get<EquipmentResponseType>(`/equipments-package/all`)

  return response.data.data
}

export async function getPackageById(id: string) {
  const response = await request.get<EquipmentDetailType>(`/equipments-package/get-by/${id}`)

  return response.data.data
}

export async function getAllEquipment() {
  const response = await request.get<ProductList>(`/equipments/all`)

  return response.data.data
}

export async function getFeedbackById(id: string) {
  const response = await request.get<FeedbackByRentalIdResponseType>(`feedbacks/rental/${id}`)

  return response.data.data
}

export async function getCategories() {
  const response = await request.get<CategoryResponseData>('categories/all')
  return response.data.data
}

export async function getEquipmentsByCategory({
  categoryId,
  page,
  limit,
}: {
  categoryId: string
  page: number
  limit: number
}) {
  const response = await request.get<EquipmentResponseType>(
    `categories/${categoryId}/equipments/all/pagination?page=${page}&limit=${limit}`,
  )
  return response.data.data
}

export async function getFeedbackByEquipmentIdOfPackageId({
  equipmentId,
  packageId,
}: {
  equipmentId?: string
  packageId?: string
}) {
  const response = await request.get<ReviewList>(`/feedbacks/by-equipment-or-package`, {
    params: {
      equipmentId,
      packageId,
    },
  })

  return response.data
}
