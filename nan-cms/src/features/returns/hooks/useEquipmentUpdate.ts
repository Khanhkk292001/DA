import { updateEquipment } from '@/libs/api/equipments'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { EquipmentUpdateInputType } from '../type'

export const useEquipmentUpdate = (setError: UseFormSetError<EquipmentUpdateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof EquipmentUpdateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: updateEquipment,
    onError: handleMutationError,
  })

  return mutation
}
