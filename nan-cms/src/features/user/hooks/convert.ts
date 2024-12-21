import { HAS_ASSETS_OPTIONS, INCOME_OPTIONS } from '../options'

export const convertTextHasAssets = (hasAssets: string | number | null | undefined) => {
  return hasAssets !== null && hasAssets !== undefined ? (hasAssets === 1 ? '有り' : 1) : '-'
}

export const convertIsPaidText = (isPaid: string | number | undefined | null) => {
  return isPaid !== null && isPaid !== undefined ? (isPaid === 1 ? '有料' : '-') : '-'
}

export const convertWillingText = (willing: number | undefined) => {
  return willing ? '-' : '-'
}

export const convertIncomeText = (income: number | undefined) => {
  return income ? INCOME_OPTIONS[income - 1].label : '-'
}

export const convertHasAssetsText = (hasAssets: number | string | undefined) => {
  return HAS_ASSETS_OPTIONS.find((option) => option.value == hasAssets)?.label || '-'
}
