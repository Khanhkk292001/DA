export const generateMediaUrl = (path: string, type: 'audio' | 'image') => {
  return `${process.env.NEXT_PUBLIC_API_URL}/streams/${type}?path=${path}`
}
