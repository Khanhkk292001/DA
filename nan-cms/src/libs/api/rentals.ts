import {
  QueryInputRentalDetailType,
  RentalCreateInputType,
  RentalDetailResponseType,
  RentalListQueryInputType,
  RentalListType,
  RentalUpdateInputType,
} from '@/features/rentals'
import request from '../config/axios'

export const getListRentals = async (params: RentalListQueryInputType) => {
  const { page, limit, status, isFullyReturned } = params
  try {
    const response = await request.get<RentalListType>('/rentals/all/pagination', {
      params: {
        page,
        limit,
        status,
        isFullyReturned,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getRental = async (id: string) => {
  try {
    const response = await request.get<RentalDetailResponseType>(`/rentals/get-by/${id}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createRental = async (data: RentalCreateInputType) => {
  try {
    const response = await request.post('/rentals/create', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateRental = async (data: RentalUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data
    const response = await request.patch(`/rentals/update/${id}`, dataRequest)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getRentalDetail = async ({ column, rentalId }: QueryInputRentalDetailType) => {
  try {
    const response = await request.get<RentalDetailResponseType>(`/rentals/get-by/${rentalId}`, {
      params: {
        column,
      },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteRental = async (rentalId: string) => {
  try {
    const response = await request.delete(`/rentals/remove/${rentalId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getRentalValueLabels = async () => {
  try {
    const response = await request.get('/rentals/all/label-value')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getListItemsByRental = async (
  id: string,
  params: RentalListQueryInputType,
): Promise<RentalListType> => {
  const { page, limit, status } = params
  try {
    const response = await request.get<RentalListType>(`/rentals/${id}/items/all/pagination`, {
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

export const confirmRental = async (id: string) => {
  try {
    const response = await request.patch(`/rentals/confirm/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const cancelRental = async (id: string) => {
  try {
    const response = await request.patch(`/rentals/cancel/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
