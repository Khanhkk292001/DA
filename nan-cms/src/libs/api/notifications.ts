import { NotificationsResponse } from '@/libs/components/Layout/Header/Notification/type'
import request from '../config/axios'

export const getNotifications = async () => {
  const response = await request.get<NotificationsResponse>('/notifications')
  return response.data.data
}

export const markAllNotificationsAsRead = async () => {
  await request.patch('/notifications/by-me/read')
}

export const markNotificationAsRead = async (id: string) => {
  await request.patch(`/notifications/${id}/read`)
}
