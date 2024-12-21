import {
  DiscountCreateInputType,
  DiscountDetailResponseType,
  DiscountListQueryInputType,
  DiscountListType,
  DiscountUpdateInputType,
  QueryInputDiscountDetailType,
} from '@/features/discounts'
import request from '../config/axios'

export const getListDiscounts = async (params: DiscountListQueryInputType) => {
  const { page, limit, filter } = params
  try {
    const response = await request.get<DiscountListType>('/discounts/all/pagination', {
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

export const getDiscount = async (id: string) => {
  try {
    const response = await request.get<DiscountDetailResponseType>(`/discounts/get-by/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createDiscount = async (data: DiscountCreateInputType) => {
  try {
    const response = await request.post('/discounts/create', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateDiscount = async (data: DiscountUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data

    const response = await request.patch(`/discounts/update/${id}`, dataRequest)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getDiscountDetail = async ({ column, discountId }: QueryInputDiscountDetailType) => {
  try {
    const response = await request.get<DiscountDetailResponseType>(
      `/discounts/get-by/${discountId}`,
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

export const deleteDiscount = async (id: string) => {
  try {
    const response = await request.delete(`/discounts/remove/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
