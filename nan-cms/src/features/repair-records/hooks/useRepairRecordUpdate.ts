import { updateRepairRecord } from '@/libs/api/repair-records'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { RepairRecordUpdateInputType } from '../type'

export const useRepairRecordUpdate = (setError: UseFormSetError<RepairRecordUpdateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof RepairRecordUpdateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: updateRepairRecord,
    onError: handleMutationError,
  })

  return mutation
}
