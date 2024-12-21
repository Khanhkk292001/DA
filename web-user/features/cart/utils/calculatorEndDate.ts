import { addDays, addMonths, addWeeks } from 'date-fns'

type CalculateEndDateParams = {
  startDate: string // Định dạng yyyy-MM-dd hoặc ISO
  durationType: 'day' | 'week' | 'month'
  durationValue: number | string
}

export function calculateEndDate({ startDate, durationType, durationValue }: CalculateEndDateParams): string {
  if (!startDate || !durationValue || !durationValue) {
    return null
  }

  const formatDurationValue = Number(durationValue)

  if (isNaN(formatDurationValue) || formatDurationValue < 0) {
    return null
  }

  const start = new Date(startDate)
  if (isNaN(start.getTime())) {
    throw new Error('Ngày bắt đầu không hợp lệ')
  }

  switch (durationType) {
    case 'day':
      return addDays(start, Number(durationValue)).toISOString()
    case 'week':
      return addWeeks(start, Number(durationValue)).toISOString()
    case 'month':
      return addMonths(start, Number(durationValue)).toISOString()
    default:
      throw new Error('Loại thời lượng không hợp lệ')
  }
}
