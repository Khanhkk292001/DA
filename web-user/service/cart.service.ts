import { CartResponseType } from '@/features/cart/type'
import { CartInputType } from '@/features/product/type'
import request from '@/libs/configs/axios/axios'

export const createCart = async (cart: CartInputType) => {
  const response = await request.post('/carts/add/by-me', cart)

  return response.data
}

export const getCarts = async () => {
  const response = await request.get<CartResponseType>('/carts/get/by-me')

  return response.data
}

export const deleteCart = async (cartItemId: string) => {
  const response = await request.delete(`/carts/remove/by-me`, {
    data: { itemId: cartItemId },
  })

  return response.data
}

export const clearCart = async () => {
  const response = await request.delete('/carts/clear/by-me')

  return response.data
}
