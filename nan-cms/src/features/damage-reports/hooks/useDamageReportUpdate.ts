import { updateDamageReport } from '@/libs/api/damage-reports'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { DamageReportUpdateInputType } from '../type'

export const useDamageReportUpdate = (setError: UseFormSetError<DamageReportUpdateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof DamageReportUpdateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: updateDamageReport,
    onError: handleMutationError,
  })

  return mutation
}
