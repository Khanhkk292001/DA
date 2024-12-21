import { updateUsageRecord } from '@/libs/api/usage-records'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { UsageRecordUpdateInputType } from '../type'

export const useUsageRecordUpdate = (setError: UseFormSetError<UsageRecordUpdateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof UsageRecordUpdateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: updateUsageRecord,
    onError: handleMutationError,
  })

  return mutation
}
