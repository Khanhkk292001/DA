import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export enum DeviceStatus {
  available = 'available',
  rented = 'rented',
  underMaintenance = 'under_maintenance',
}

export type DeviceType = {
  id?: string
  name?: string
  description?: string
  image?: string
  priceDay?: number
  priceWeek?: number
  priceMonth?: number
  status?: DeviceStatus
  categoryId?: string
  createdAt?: string
  updatedAt?: string
}

export type DeviceDetailType = {
  id?: string
  name?: string
  description?: string
  image?: string
  priceDay?: string
  priceWeek?: string
  priceMonth?: string
  status?: string
  categoryId?: string
  createdAt?: string
  updatedAt?: string
}

export type DeviceListType = {
  data: DeviceType[]
} & PaginationType

export type DeviceSearchInputType = PaginationType & {
  filter?: string
  page?: string
  next?: string
}

export type DeviceListQueryInputType = DeviceSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type DeviceDetailResponseType = {
  data: DeviceDetailType
}

export type QueryInputDeviceDetailType = {
  deviceId?: string
  sortBy?: string
  column?: string
}

export const DeviceCreateInputSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Tên thiết bị là bắt buộc' })
    .max(100, { message: 'Tên thiết bị không được dài quá 100 ký tự' }),
  description: z
    .string()
    .min(1, { message: 'Mô tả là bắt buộc' })
    .max(500, { message: 'Mô tả không được dài quá 500 ký tự' })
    .optional(),
  image: z.string().min(1, { message: 'Hình ảnh là bắt buộc' }),
  priceDay: z
    .union([z.string().min(0, { message: 'Giá theo ngày là bắt buộc' }), z.number()])
    .optional(),
  priceWeek: z
    .union([z.string().min(0, { message: 'Giá theo tuần là bắt buộc' }), z.number()])
    .optional(),
  priceMonth: z
    .union([z.string().min(0, { message: 'Giá theo tháng là bắt buộc' }), z.number()])
    .optional(),
  status: z.nativeEnum(DeviceStatus).default(DeviceStatus.available),
  categoryId: z.string().min(1, { message: 'ID thể loại là bắt buộc' }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const DeviceUpdateInputSchema = DeviceCreateInputSchema.extend({
  id: z.string().min(1, { message: 'ID thiết bị là bắt buộc' }),
})

export type DeviceCreateInputType = TypeOf<typeof DeviceCreateInputSchema>
export type DeviceUpdateInputType = TypeOf<typeof DeviceUpdateInputSchema>
