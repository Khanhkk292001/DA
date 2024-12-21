import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'
import { AdminInfoType } from '../auth'

export type ArticleStatusType = 1 | 2 | 3 | 4

export const YoutubeUrlSchema = z.string().refine(
  (url) => {
    try {
      const urlObj = new URL(url)
      let videoId

      // Check if the URL is a standard video URL
      if (urlObj.searchParams.has('v')) {
        videoId = urlObj.searchParams.get('v')
      } else {
        // For live streams, the video ID is part of the path
        const pathSegments = urlObj.pathname.split('/')
        videoId = pathSegments[pathSegments.length - 1]
      }

      return videoId
    } catch {
      return false
    }
  },
  {
    message: '正しい URL を入力してください。',
    path: [],
  },
)

export type ArticleType = {
  id: number
  admin_id: number
  status: ArticleStatusType
  title: string
  category: string
  url: string
  publish_start: string
  publish_end: string
  created_at: string | null
  updated_at: string | null
  deleted_at: string | null
  get_total_amount: number
  admin: AdminInfoType
}

export const ArticleInputSchema = z.object({
  search: z.string().optional(),
  status: z.number().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
})

export type ArticleListType = {
  data: ArticleType[]
} & PaginationType

export const ArticleCreateInputSchema = z.object({
  title: z.string().optional(),
  category: z.string().optional(),
  url: z.string().optional(),
  publish_start: z.string().or(z.date()).optional(),
  publish_end: z.string().or(z.date()).optional(),
  status: z.number(),
})

export const ArticleUpdateInputSchema = z
  .object({
    id: z.string(),
  })
  .merge(ArticleCreateInputSchema)

export type ArticleDetailType = {
  data: ArticleType
}

export type ArticleInputType = TypeOf<typeof ArticleInputSchema>
export type ArticleCreateInputType = TypeOf<typeof ArticleCreateInputSchema>
export type ArticleUpdateInputType = TypeOf<typeof ArticleUpdateInputSchema>
export type QueryInputListArticle = {
  page?: number
  limit?: number
  search?: string
  sort_by?: string
  column?: string
  status?: number
}
export type YoutubeType = TypeOf<typeof YoutubeUrlSchema>
