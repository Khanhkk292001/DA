'use client'

import { DetailItem } from '@/features/article/components'
import { UserUpdateIndentityDocSchema, UserUpdateIndentityDocType } from '@/features/user'
import { FormLayout, Select } from '@/libs/components/Form'
import request from '@/libs/config/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDamageReportDetail } from '../hooks'

const DamageReportDetail = () => {
  const { id } = useParams()
  const { data, isLoading } = useDamageReportDetail(id as string)

  const { control, handleSubmit, setValue } = useForm<UserUpdateIndentityDocType>({
    defaultValues: {
      status: '',
    },
    values: {
      status: data?.status as string,
    },
    resolver: zodResolver(UserUpdateIndentityDocSchema),
  })

  useEffect(() => {
    if (data?.status) {
      setValue('status', data?.status)
    }
  }, [data])

  const { mutate } = useMutation({
    mutationFn: async ({ status, id }: { status: string; id: string }) => {
      const response = await request.patch(`/damage-reports/update/${id}/status`, {
        status,
      })

      return response.data
    },
    onSuccess: (data: UserUpdateIndentityDocType) => {
      enqueueSnackbar('Thay đổi trạng thái thành công', { variant: 'success' })
    },
    onError: (error) => {
      enqueueSnackbar('Thay đổi trạng thái thất bại', { variant: 'error' })
    },
  })

  const onSubmit = (data: UserUpdateIndentityDocType) => {
    mutate({
      id: id as string,
      ...data,
    })
  }

  return (
    <FormLayout
      isDirty={false}
      onSubmit={handleSubmit(onSubmit)}
      title="Chi tiết"
      isLoading={isLoading}
      closeFormPath='/damage-reports'
    >
      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?.id} isPending={isLoading} />
          <DetailItem label="Mô tả chính sách" value={data?.description} isPending={isLoading} />
          {/* <DetailItem label="Trạng thái" value={data?.status} isPending={isLoading} /> */}
          <DetailItem
            label="Ảnh"
            image={{
              src: data?.image as string,
              alt: 'Ảnh hỏng hóc',
            }}
            isPending={isLoading}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
            <Select
              control={control}
              name="status"
              label="Trạng thái"
              labelLeft
              fullWidth
              placeholder="Chọn trạng thái"
              hiddenEmpty
              options={[
                {
                  label: 'Chưa xử lý',
                  value: 'pending',
                },
                {
                  label: 'Hỏng nặng',
                  value: 'heavy',
                },
                {
                  label: 'Hỏng nhẹ',
                  value: 'normal',
                },
                {
                  label: 'Huỷ',
                  value: 'cancel',
                },
              ]}
            />
          </Stack>
        </Stack>
      </Box>
    </FormLayout>
  )
}

export { DamageReportDetail }
