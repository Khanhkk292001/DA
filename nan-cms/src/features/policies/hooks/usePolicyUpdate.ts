import { updatePolicy } from '@/libs/api/policy'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { PolicyUpdateInputType } from '../type'

export const usePolicyUpdate = (setError: UseFormSetError<PolicyUpdateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof PolicyUpdateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: updatePolicy,
    onError: handleMutationError,
  })

  return mutation
}
