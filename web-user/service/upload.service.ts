import request from '@/libs/configs/axios/axios'

type UploadResponse = {
  url: string
}

export const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await request.post<UploadResponse>('/upload/file', formData)
  return response.data
}
