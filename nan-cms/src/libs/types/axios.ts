import { AxiosError, AxiosResponse } from 'axios'

export interface ErrorTypeResponse extends AxiosError {
  response: AxiosResponse<{
    message: string
    errors: {
      [key: string]: string
    }
  }>
}
