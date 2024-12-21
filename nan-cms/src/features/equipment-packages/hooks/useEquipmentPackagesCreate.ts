import { createEquipmentPackage } from '@/libs/api/equipments-package'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { EquipmentPackageCreateInputType } from '../type'

export const useEquipmentPackageCreate = (
  setError: UseFormSetError<EquipmentPackageCreateInputType>,
) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof EquipmentPackageCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createEquipmentPackage,
    onError: handleMutationError,
  })

  return mutation
}
