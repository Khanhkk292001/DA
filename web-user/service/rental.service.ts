import { CartInputType } from '@/features/cart/type'
import {
  DamageReportInputType,
  FeedbackInputType,
  FeedbackItemInputType,
  RentalResponseType,
} from '@/features/history-rental/type'
import request from '@/libs/configs/axios/axios'

export const createRental = async (data: CartInputType) => {
  const response = await request.post('/rentals/create/by-me', data)

  return response.data
}

export const getHistoryRentals = async () => {
  const response = await request.get<RentalResponseType>('/rentals/by-me')

  return response.data.data
}

export const feedbackRental = async (data: FeedbackInputType) => {
  const response = await request.post(`/feedbacks/create`, data)

  return response.data
}

export const damageReport = async (data: DamageReportInputType) => {
  const response = await request.post(`/damage-reports/create/by-me`, data)

  return response.data
}

export const feedbackItem = async (data: FeedbackItemInputType) => {
  const response = await request.post(`/feedbacks/create/rental-item`, data)

  return response.data
}
