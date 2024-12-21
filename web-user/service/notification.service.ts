import { NotificationsResponse } from '@/libs/components/Layout/Header/Notification/type'
import request from '@/libs/configs/axios/axios'

export const getNotifications = async () => {
  const response = await request.get<NotificationsResponse>('/notifications/get/by-me')
  return response.data.data
}

export const markAllNotificationsAsRead = async () => {
  await request.patch('/notifications/by-me/read')
}

export const markNotificationAsRead = async (id: string) => {
  await request.patch(`/notifications/${id}/read`)
}
