export type CategoryType = {
  id: string
  name: string
  description: string | null
}

export type CategoriesResponse = {
  data: CategoryType[]
}

export type EquipmentType = {
  id: string
  name: string
  image: string
  description: string
  rentalPrice: number
  basePrice: number
  stock: number
  categoryId: string
  createdAt: string
  updatedAt: string
  category: CategoryType
  equipmentId: string
  equipments: {
    equipmentId: string
    equipment: EquipmentType
  }[]
}

export type EquipmentResponseType = {
  data: EquipmentType[]
}

export type EquipmentDetailType = {
  data: EquipmentType
}

export interface Product {
  id: string
  name: string
  image: string // URL string
  description: string
  pricePerDay: number
  pricePerWeek: number
  pricePerMonth: number
  stock: number
  categoryId: string
  createdAt: string // ISO 8601 date string
  updatedAt: string // ISO 8601 date string
  category: {
    id: string
    name: string
    description: string
    createdAt: string // ISO 8601 date string
    updatedAt: string // ISO 8601 date string
  }
}

export interface ProductList {
  data: EquipmentType[]
}

export type Category = {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export type CategoryResponseData = {
  data: Category[]
}
