import { createCategory } from '@/libs/api/categories'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { CategoryCreateInputType } from '../type'

export const useCategoryCreate = (setError: UseFormSetError<CategoryCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof CategoryCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createCategory,
    onError: handleMutationError,
  })

  return mutation
}
