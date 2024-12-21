import { updateMaintenance } from '@/libs/api/maintenance'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { MaintenanceUpdateInputType } from '../type'

export const useMaintenanceUpdate = (setError: UseFormSetError<MaintenanceUpdateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof MaintenanceUpdateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: updateMaintenance,
    onError: handleMutationError,
  })

  return mutation
}
