export type DamageReportType = {
  id: string
  description: string
  damageDate: string
  status: 'pending' | 'active' | 'completed' | 'canceled'
  image: string
  equipmentId: string
  userId: string
  createdAt: string
  updatedAt: string
  equipment: {
    id: string
    name: string
    image: string
    description: string
    pricePerDay: number
    pricePerWeek: number
    pricePerMonth: number
    stock: number
    categoryId: string
    createdAt: string
    updatedAt: string
  }
  user: {
    id: string
    name: string
    email: string
    emailVerified: string
    password: string
    role: 'user' | 'admin'
    identityDoc: string
    createdAt: string
    updatedAt: string
  }
}

export type DamageReportResponseType = {
  data: DamageReportType
}
