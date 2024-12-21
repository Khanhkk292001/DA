import { createEquipment } from '@/libs/api/equipments'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { EquipmentCreateInputType } from '../type'

export const useEquipmentCreate = (setError: UseFormSetError<EquipmentCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof EquipmentCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createEquipment,
    onError: handleMutationError,
  })

  return mutation
}
