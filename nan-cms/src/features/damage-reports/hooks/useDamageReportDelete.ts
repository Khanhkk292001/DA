import { deleteDamageReport } from '@/libs/api/damage-reports'
import { useMutation } from '@tanstack/react-query'

export const useDamageReportDelete = () => {
  const { mutate } = useMutation({
    mutationFn: deleteDamageReport,
  })

  return {
    deleteDamageReport: mutate,
  }
}
