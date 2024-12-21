import { createUsageRecord } from '@/libs/api/usage-records'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { UsageRecordCreateInputType } from '../type'

export const useUsageRecordCreate = (setError: UseFormSetError<UsageRecordCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof UsageRecordCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createUsageRecord,
    onError: handleMutationError,
  })

  return mutation
}
