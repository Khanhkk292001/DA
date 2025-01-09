'use client'

import { DetailItem } from '@/features/article/components'
import { FormLayout, Input } from '@/libs/components/Form'
import { formatDate } from '@/utils/format'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox, FormControlLabel, Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useReturnCreate, useReturnDetail, useReturnUpdate } from '../hooks'
import { ReturnCreateInputSchema, ReturnCreateInputType } from '../type'

const ReturnForm = () => {
  const router = useRouter()
  const { returnId } = useParams()
  const { data: returnDetail } = useReturnDetail(returnId as string)

  console.log(returnDetail, 'retunDetail')

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty },
  } = useForm<ReturnCreateInputType>({
    defaultValues: {
      isFullyReturned: true,
      rentalId: '',
      description: '',
    },
    resolver: zodResolver(ReturnCreateInputSchema),
  })

  useEffect(() => {
    if (returnDetail) {
      const { description, rentalId, isFullyReturned } = returnDetail
      setValue('description', description as string)
      setValue('rentalId', rentalId as string)
      setValue('isFullyReturned', isFullyReturned as boolean)
    }
  }, [setValue, returnDetail])

  const { mutate: createReturn, isPending: isPendingCreate } = useReturnCreate(setError)
  const { mutate: updateReturn, isPending: isPendingUpdate } = useReturnUpdate(setError)

  const onSubmit: SubmitHandler<ReturnCreateInputType> = (data) => {
    const submitData = { ...data, id: returnId as string }

    const successCallback = () => {
      enqueueSnackbar(returnId ? 'Cập nhật thành công' : 'Thêm mới thành công', {
        variant: 'success',
      })
      router.push(returnId ? `/returns/${returnId}/detail` : '/returns')
    }

    if (returnId) {
      updateReturn(submitData, { onSuccess: successCallback })
    } else {
      createReturn(data, { onSuccess: successCallback })
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={returnId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row" spacing={2}>
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Controller
            name="isFullyReturned"
            control={control}
            defaultValue={true}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Đã trả đầy đủ"
              />
            )}
          />
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={returnDetail?.id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>

          <Stack direction="column" gap={2}>
            <Input
              control={control}
              name="rentalId"
              label="Id đơn thuê"
              labelLeft
              placeholder="Id đơn thuê"
              fullWidth
            />
            <Input
              control={control}
              name="description"
              label="Mô tả"
              labelLeft
              placeholder="Mô tả"
              fullWidth
            />

            <DetailItem label="Ngày tạo" value={formatDate(returnDetail?.createdAt as string)} />
            <DetailItem
              label="Ngày cập nhật"
              value={formatDate(returnDetail?.updatedAt as string)}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { ReturnForm }
