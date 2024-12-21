import { format } from 'date-fns'

export const formatDateTime = (date: string | null | undefined) => {
  return date ? format(new Date(date), 'yyyy/MM/dd/ HH:mm') : '-'
}

export const formatDate = (date: string | null | undefined) => {
  return date ? format(new Date(date), 'dd/MM/yyyy') : '-'
}

export const formatRequestDate = (date: string | Date | undefined) => {
  return date ? format(new Date(date), 'yyyy-MM-dd') : date
}

export const formatNumber = (value: number | string) => {
  if (typeof value === 'string') {
    value = Number(value)
  }

  return value.toLocaleString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const formatDateJp = (date: string | null | undefined) => {
  return date ? format(new Date(date), 'yyyy年MM月dd日') : '-'
}

export const formatDateMonthJp = (date: string | null | undefined) => {
  return date ? format(new Date(date), 'yyyy年MM月') : '-'
}
