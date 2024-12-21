export type NotificationType = {
  id: string // ID của thông báo
  message: string // Nội dung thông báo
  status: 'unread' | 'read' // Trạng thái thông báo
  userId: string // ID của người dùng nhận thông báo
  createdAt: string // Thời gian tạo thông báo (ISO format)
  updatedAt: string // Thời gian cập nhật thông báo (ISO format)
}

export type NotificationsResponse = {
  data: NotificationType[]
}
