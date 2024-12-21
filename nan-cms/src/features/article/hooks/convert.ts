import { StatusColorType } from '@/libs/components/StatusTag'
import { ArticleStatusType } from '..'

export const convertArticleStatus = (
  status: ArticleStatusType,
): {
  text: string
  color: StatusColorType
} => {
  switch (status) {
    case 1:
      return {
        text: '公開中',
        color: 'green',
      }
    case 2:
      return {
        text: '非公開',
        color: 'grey',
      }
    case 3:
      return {
        text: '公開予約中',
        color: 'yellow',
      }
    case 4:
      return {
        text: '公開終了',
        color: 'grey',
      }
  }
}

export const convertArticleDetailStatus = (
  status: ArticleStatusType,
): {
  text: string
  color: StatusColorType
} => {
  switch (status) {
    case 1:
      return {
        text: '公開中',
        color: 'green',
      }
    case 2:
      return {
        text: '非公開',
        color: 'grey',
      }
    case 3:
      return {
        text: '公開中',
        color: 'green',
      }
    case 4:
      return {
        text: '公開中',
        color: 'green',
      }
  }
}
