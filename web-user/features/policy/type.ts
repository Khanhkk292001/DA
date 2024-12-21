export type PolicyType = {
  id: string
  description: string
  depositRate: number // Tỷ lệ đặt cọc (giá trị phần trăm)
  damageProcessingFee: number // Phí xử lý hỏng hóc
  createdAt: string // Ngày tạo (ISO Date)
  updatedAt: string // Ngày cập nhật (ISO Date)
}

export type PolicyResponseType = {
  data: PolicyType[]
}
