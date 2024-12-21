export function formatMoney(value?: string | number) {
  return value ? `${Number(value || 0).toLocaleString('en-US')}đ` : '0đ'
}
