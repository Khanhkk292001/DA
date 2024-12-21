import { createMaintenance } from '@/libs/api/maintenance'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { MaintenanceCreateInputType } from '../type'

export const useMaintenanceCreate = (setError: UseFormSetError<MaintenanceCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof MaintenanceCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createMaintenance,
    onError: handleMutationError,
  })

  return mutation
}
