import { ACCESS_TOKEN_KEY } from '@/constants'

export const getAccessTokenFromStorage = async () => {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  } catch (error) {
    console.error(error)
    return null
  }
}

export const setAccessTokenToStorage = async (accessToken: string) => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  } catch (error) {
    console.error(error)
  }
}

export const removeAccessTokenFromStorage = async () => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  } catch (error) {
    console.error(error)
  }
}
