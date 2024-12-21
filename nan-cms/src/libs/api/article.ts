import {
  ArticleCreateInputType,
  ArticleDetailType,
  ArticleListType,
  ArticleUpdateInputType,
  QueryInputListArticle,
} from '@/features/article/type'
import request from '../config/axios'

export const getListArticles = async (params: QueryInputListArticle) => {
  try {
    const response = await request.get<ArticleListType>('/articles/list', {
      params,
    })

    return response.data
  } catch (err) {
    throw err
  }
}

export const createArticle = async (data: ArticleCreateInputType) => {
  try {
    const response = await request.post('/articles/registration', data)

    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteArticle = async ({ id }: { id: string }) => {
  try {
    const response = await request.delete(`/articles/delete/${id}`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const updateArticle = async (data: ArticleUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data
    const response = await request.put(`/articles/update/${id}`, dataRequest)

    return response.data
  } catch (error) {
    throw error
  }
}

export const getArticle = async (id: string) => {
  try {
    const response = await request.get<ArticleDetailType>(`/articles/detail/${id}`)

    return response.data
  } catch (error) {
    throw error
  }
}
