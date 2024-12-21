import { createDamageReport } from '@/libs/api/damage-reports'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { DamageReportCreateInputType } from '../type'

export const useDamageReportCreate = (setError: UseFormSetError<DamageReportCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof DamageReportCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createDamageReport,
    onError: handleMutationError,
  })

  return mutation
}
