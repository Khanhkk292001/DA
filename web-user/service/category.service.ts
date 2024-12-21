import { CategoriesResponse } from '@/features'
import request from '@/libs/configs/axios/axios'

export const getCategries = async () => {
  const response = await request.get<CategoriesResponse>('/categories/all')

  return response.data.data
}
