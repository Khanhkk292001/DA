import { createPolicy } from '@/libs/api/policy'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { PolicyCreateInputType } from '../type'

export const usePolicyCreate = (setError: UseFormSetError<PolicyCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof PolicyCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createPolicy,
    onError: handleMutationError,
  })

  return mutation
}
