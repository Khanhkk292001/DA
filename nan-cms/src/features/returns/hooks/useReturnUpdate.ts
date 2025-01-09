import { updateReturn } from '@/libs/api/returns'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { ReturnUpdateInputType } from '../type'

export const useReturnUpdate = (setError: UseFormSetError<ReturnUpdateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof ReturnUpdateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: updateReturn,
    onError: handleMutationError,
  })

  return mutation
}
