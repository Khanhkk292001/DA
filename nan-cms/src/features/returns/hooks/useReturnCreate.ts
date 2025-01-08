import { createReturn } from '@/libs/api/returns'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { ReturnCreateInputType } from '../type'

export const useReturnCreate = (setError: UseFormSetError<ReturnCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          console.log(message)
          setError(key as keyof ReturnCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createReturn,
    onError: handleMutationError,
  })

  return mutation
}
