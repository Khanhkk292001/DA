import { DiscountResponseType } from '@/features/cart/type'
import request from '@/libs/configs/axios/axios'

export function getDiscountPagination(params) {
  return request.get(`discounts/all/pagination`, { params })
}

export async function getDiscountById(id) {
  const response = await request.get<DiscountResponseType>(`discounts/get-by/${id}`)

  return response.data.data
}
