export const truncate = (str: string, length: number) => {
  let count = 0
  let index = 0

  while (count < length && index < str.length) {
    const char = str[index]
    count += char.charCodeAt(0) > 255 ? 2 : 1
    index++
  }

  return count > length ? str.substring(0, index - 1) + '...' : str
}
