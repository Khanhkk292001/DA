'use client'

import { DatePicker, Input, Select } from '@/libs/components/Form'
import { UploadImage } from '@/libs/components/Form/UploadImg'
import { useGetMe } from '@/libs/hooks'
import { updateInformation } from '@/service/user.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { UpdateUserInputSchema, UpdateUserInputType } from './type'

export function ProfileForm() {
  const { data } = useGetMe()

  const { handleSubmit, control } = useForm<UpdateUserInputType>({
    defaultValues: {
      email: '',
      name: '',
      gender: 'Nam',
      phoneNumber: '',
      avatar: data?.avatar ?? '',
      dateOfBirth: '',
    },
    values: {
      email: data?.email,
      name: data?.name ?? '',
      avatar: data?.avatar ?? '',
      phoneNumber: data?.phoneNumber ?? '',
      dateOfBirth: data?.dateOfBirth,
      gender: data?.gender ?? 'Nam',
    },
    resolver: zodResolver(UpdateUserInputSchema),
  })

  const { mutate } = useMutation({
    mutationFn: updateInformation,
    onSuccess: () => {
      toast.success('Cập nhật thành công')
    },
    onError: () => {
      toast.error('Cập nhật thất bại')
    },
  })

  const onSubmit: SubmitHandler<UpdateUserInputType> = (formData) => {
    const { email, name, ...data } = formData
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
        <UploadImage control={control} name="avatar" content="Ảnh đại diện" />
        <Input name="email" control={control} fullWidth placeholder="Email" autoComplete="email" disabled />
        <Input name="name" control={control} fullWidth placeholder="Họ và tên" autoComplete="name" />
        <Input name="phoneNumber" control={control} fullWidth placeholder="Số điện thoại" />
        <DatePicker name="dateOfBirth" control={control} fullWidth placeholder="Ngày sinh" />
        <Select
          name="gender"
          control={control}
          fullWidth
          hiddenEmpty
          options={[
            {
              label: 'Nam',
              value: 'Nam',
            },
            {
              label: 'Nữ',
              value: 'Nữ',
            },
          ]}
        />

        <Stack direction="row" spacing={3}>
          <Button type="submit" variant="contained" color="primary">
            Cập nhật
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
