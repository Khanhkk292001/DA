'use client'

import { createArticle, getArticle, updateArticle } from '@/libs/api/article'
import { DatePicker } from '@/libs/components/DatePicker'
import { FormLayout, Input } from '@/libs/components/Form'
import { SelectStatus } from '@/libs/components/Form/Select/SelectStatus'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { formatRequestDate } from '@/utils/format'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { KeyboardEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DetailItem, YoutubeVideo } from '../components'
import { ARTICLE_SELECT_FORM_OPTION } from '../options'
import { ArticleCreateInputSchema, ArticleCreateInputType } from '../type'

const ArticleForm = () => {
  const router = useRouter()
  const { articleId } = useParams()
  const [youtubeUrl, setYoutubeUrl] = useState<string | undefined>('')
  const query = useQuery({
    queryKey: ['article', articleId],
    queryFn: () => getArticle(articleId as string),
    enabled: !!articleId,
  })

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { isDirty, errors },
    setError,
  } = useForm<ArticleCreateInputType>({
    defaultValues: {
      category: '',
      publish_end: '',
      publish_start: '',
      title: '',
      url: '',
      status: 2,
    },
    values: query.data?.data,
    resolver: zodResolver(ArticleCreateInputSchema),
  })

  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      const { category, publish_start, publish_end, url, title } = errorValidation

      if (category) {
        setError('category', { message: category })
      }

      if (publish_start) {
        setError('publish_start', { message: publish_start })
      }

      if (url) {
        setError('url', { message: url })
      }

      if (publish_end) {
        setError('publish_end', { message: publish_end })
      }

      if (title) {
        setError('title', { message: title })
      }
    }
  }

  const { mutate: create } = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      router.push('/articles')
    },
    onError: handleMutationError,
  })

  const { mutate: update } = useMutation({
    mutationFn: updateArticle,
    onSuccess: () => {
      router.push('/articles')
    },
    onError: handleMutationError,
  })

  const onSubmit: SubmitHandler<ArticleCreateInputType> = (data) => {
    if (articleId) {
      update({ id: articleId as string, ...data })
      return
    }

    create({
      ...data,
      publish_start: formatRequestDate(data.publish_start),
      publish_end: formatRequestDate(data.publish_end),
    })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      setYoutubeUrl(getValues('url'))
    }
  }

  useEffect(() => {
    if (articleId && !query.isPending) {
      setYoutubeUrl(watch('url'))
    }
  }, [articleId, watch, query.isPending])

  return (
    <FormLayout
      title={articleId ? 'コンテンツ編集' : 'コンテンツ登録'}
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={onKeyDown}
      isDirty={isDirty}
    >
      <Stack direction="row">
        <Stack spacing="1px">
          <Stack direction="row" gap={4}>
            <DetailItem label="コンテンツID" value={articleId ? (articleId as string) : '-'} />

            <SelectStatus
              control={control}
              name="status"
              labelLeft
              label="ステータス"
              options={ARTICLE_SELECT_FORM_OPTION}
              haveIndicator
            />
          </Stack>
          <Stack direction="row" gap={4}>
            <Input control={control} name="title" label="タイトル" labelLeft width="320px" />
            <Input
              control={control}
              name="category"
              label="カテゴリ名"
              labelLeft
              sx={{
                width: 320,
                fontWeight: 500,
                color: 'grey.500',
              }}
            />
          </Stack>
          <Stack direction="row" spacing="10px" alignItems="stretch">
            <DatePicker
              control={control}
              name="publish_start"
              label="公開日時"
              labelLeft
              fullWidth
              inputSx={{
                '&& .MuiOutlinedInput-input': {
                  fontWeight: 400 + ' !important',
                },
              }}
            />
            <Stack justifyContent="center" height={40}>
              <Typography variant="subtitle1" color="grey.500">
                〜
              </Typography>
            </Stack>
            <DatePicker
              control={control}
              name="publish_end"
              label="終了日時"
              labelLeft
              fullWidth
              inputSx={{
                '&& .MuiOutlinedInput-input': {
                  fontWeight: 400,
                },
              }}
            />
          </Stack>
          <Input
            control={control}
            name="url"
            label="動画URL"
            labelLeft
            width="100%"
            sx={{
              fontWeight: 500,
              color: 'grey.500',
            }}
          />

          <YoutubeVideo youtubeUrl={youtubeUrl} errMessage={errors.url} />
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { ArticleForm }
