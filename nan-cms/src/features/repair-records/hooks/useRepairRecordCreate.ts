import { createRepairRecord } from '@/libs/api/repair-records'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { RepairRecordCreateInputType } from '../type'

export const useRepairRecordCreate = (setError: UseFormSetError<RepairRecordCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof RepairRecordCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createRepairRecord,
    onError: handleMutationError,
  })

  return mutation
}
