'use client'

import { UploadImage } from '@/libs/components/Form/UploadImg'
import { useGetMe } from '@/libs/hooks'
import { updateIdentityDoc } from '@/service/user.service'
import { zodResolver } from '@hookform/resolvers/zod'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Button, Stack, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { UpdateIntentInputSchema, UpdateIntentInputType } from './type'

export const IntentityDoc = () => {
  const { data } = useGetMe()

  const renderStatus = () => {
    switch (data?.statusIdentityDoc) {
      case 'verified':
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircleIcon color="success" />
            <Typography variant="body1" sx={{ color: 'success.main' }}>
              Đã xác thực
            </Typography>
          </Stack>
        )
      case 'rejected':
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircleIcon color="error" />
            <Typography variant="body1" sx={{ color: 'error.main' }}>
              Bị từ chối
            </Typography>
          </Stack>
        )
      default:
        return data?.identityDoc ? (
          <Typography variant="body1" sx={{ color: 'warning.main' }}>
            Chờ xác thực
          </Typography>
        ) : (
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1" sx={{ color: 'warning.main' }}>
              Chưa xác thực
            </Typography>
          </Stack>
        )
    }
  }

  const { mutate } = useMutation({
    mutationFn: updateIdentityDoc,
    onSuccess: () => {
      toast.success('Cập nhật thành công')
    },
    onError: () => {
      toast.error('Cập nhật thất bại')
    },
  })

  const { control, handleSubmit } = useForm<UpdateIntentInputType>({
    defaultValues: {
      identityDoc: data?.identityDoc ?? '',
    },
    values: {
      identityDoc: data?.identityDoc ?? '',
    },
    resolver: zodResolver(UpdateIntentInputSchema),
  })

  const onSubmit: SubmitHandler<UpdateIntentInputType> = (data) => {
    mutate(data)
  }

  return (
    <Stack
      sx={{
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginX: 'auto',
      }}
    >
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        width={{
          xs: '100%',
          sm: 400,
          md: 500,
          lg: 600,
        }}
      >
        <UploadImage control={control} name="identityDoc" content="Ảnh chứng minh nhân dân" />

        {renderStatus()}

        <Stack direction="row" spacing={3}>
          <Button type="submit" variant="contained" color="primary">
            Cập nhật
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
