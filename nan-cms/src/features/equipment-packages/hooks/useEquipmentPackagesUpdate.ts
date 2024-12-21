import { updateEquipmentPackage } from '@/libs/api/equipments-package'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { EquipmentPackageUpdateInputType } from '../type'

export const useEquipmentPackageUpdate = (
  setError: UseFormSetError<EquipmentPackageUpdateInputType>,
) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof EquipmentPackageUpdateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: updateEquipmentPackage,
    onError: handleMutationError,
  })

  return mutation
}
