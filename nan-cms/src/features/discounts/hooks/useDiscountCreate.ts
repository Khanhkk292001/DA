import { createDiscount } from '@/libs/api/discount'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { DiscountCreateInputType } from '../type'

export const useDiscountCreate = (setError: UseFormSetError<DiscountCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof DiscountCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createDiscount,
    onError: handleMutationError,
  })

  return mutation
}
