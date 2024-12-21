'use client'

import { deleteArticle, getArticle } from '@/libs/api/article'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { NoData } from '@/libs/components/NoData'
import { formatDate, formatDateTime } from '@/utils/format'
import { Stack } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArticleStatusType, convertArticleStatus } from '..'
import { DetailItem } from '../components'

const ArticleDetail = () => {
  const router = useRouter()
  const { articleId } = useParams()
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const { data: articleDetail, isPending } = useQuery({
    queryKey: ['article', articleId],
    queryFn: () => getArticle(articleId as string),
    enabled: !!articleId,
  })

  const { mutate } = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      router.push('/articles')
    },
  })

  if (!articleDetail && !isPending) return <NoData />

  return (
    <>
      <Stack spacing={4}>
        <Header title="コンテンツ詳細" editPath="edit" deleteFunction={handleOpenModal} />

        <Stack direction="row">
          <Stack spacing="1px">
            <DetailItem label="コンテンツID" value={articleId as string} isPending={isPending} />
            <DetailItem
              label="タイトル"
              value={articleDetail?.data.title as string}
              isPending={isPending}
            />
            <DetailItem
              label="登録日時"
              value={formatDateTime(articleDetail?.data.created_at) as string}
              isPending={isPending}
            />
            <DetailItem
              label="カテゴリ名"
              value={articleDetail?.data.category}
              isPending={isPending}
            />

            <DetailItem
              label="動画"
              youtube={{
                url: articleDetail?.data.url as string,
              }}
              isPending={isPending}
            />
          </Stack>

          <Stack spacing="1px">
            <DetailItem
              label="ステータス"
              status={convertArticleStatus(articleDetail?.data.status as ArticleStatusType)}
              isPending={isPending}
            />
            <DetailItem
              label="作成者"
              value={articleDetail?.data.admin ? articleDetail.data.admin.name : '-'}
              isPending={isPending}
            />
            <DetailItem
              label="公開日時"
              value={`${formatDate(articleDetail?.data.publish_start)} 〜 ${formatDate(articleDetail?.data.publish_end)}`}
              isPending={isPending}
            />
          </Stack>
        </Stack>
      </Stack>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={() => {
          mutate({ id: articleId as string })
        }}
        textSubmit="削除する"
        description={`${articleDetail?.data.title} を削除してよろしいですか？`}
        title="コンテンツ削除"
      />
    </>
  )
}

export { ArticleDetail }
