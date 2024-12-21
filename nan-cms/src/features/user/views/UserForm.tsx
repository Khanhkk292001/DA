'use client'

import { DetailItem } from '@/features/article/components'
import { updateIndentityDocStatus } from '@/libs/api/user'
import { FormLayout, Select } from '@/libs/components/Form'
import { formatDate } from '@/utils/format'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useUserDetailQuery } from '../hooks'
import { UserUpdateIndentityDocSchema, UserUpdateIndentityDocType } from '../type'

const UserForm = () => {
  const { userId } = useParams()
  const { data, isLoading } = useUserDetailQuery(userId as string)
  const { control, handleSubmit, setValue } = useForm<UserUpdateIndentityDocType>({
    defaultValues: {
      status: '',
    },
    values: {
      status: data?.statusIdentityDoc ?? '',
    },
    resolver: zodResolver(UserUpdateIndentityDocSchema),
  })

  useEffect(() => {
    if (data?.statusIdentityDoc) {
      setValue('status', data?.statusIdentityDoc)
    }
  }, [data])

  const { mutate } = useMutation({
    mutationFn: updateIndentityDocStatus,
    onSuccess: (data: UserUpdateIndentityDocType) => {
      enqueueSnackbar('Xác thực chứng minh thư thành công', { variant: 'success' })
    },
    onError: (error) => {
      enqueueSnackbar('Xác thực chứng minh thư thất bại', { variant: 'error' })
    },
  })

  const onSubmit = (data: UserUpdateIndentityDocType) => {
    mutate({
      userId: userId as string,
      ...data,
    })
  }

  return (
    <FormLayout
      isDirty={false}
      onSubmit={handleSubmit(onSubmit)}
      title="
      Chi tiết thông tin người dùng"
      isLoading={isLoading}
      closeFormPath='/users'
    >
      <Stack spacing={2}>
        <DetailItem label="ID" value={data?.id} isPending={isLoading} />
        <DetailItem label="Email" value={data?.email} isPending={isLoading} />
        <DetailItem label="Tên" value={data?.name} isPending={isLoading} />
        <DetailItem label="Số điện thoại" value={data?.phoneNumber} isPending={isLoading} />
        <DetailItem label="Giới tính" value={data?.gender} isPending={isLoading} />
        <DetailItem
          label="CMND"
          image={{
            src: data?.identityDoc as string,
            alt: 'CMND',
          }}
          isPending={isLoading}
        />
        <DetailItem
          label="Ngày cập nhật"
          value={formatDate(data?.updatedAt as string)}
          isPending={isLoading}
        />

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
                    label: 'Xác thực',
                    value: 'verified',
                  },
                  {
                    label: 'Không xác thực',
                    value: 'rejected',
                  },
                ]}
              />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { UserForm }
