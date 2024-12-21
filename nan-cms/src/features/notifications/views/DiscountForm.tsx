'use client'

import { DetailItem } from '@/features/article/components'
import { DatePicker } from '@/libs/components/DatePicker'
import { FormLayout, Input } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDiscountCreate, useDiscountDetail, useDiscountUpdate } from '../hooks'
import { DiscountCreateInputSchema, DiscountCreateInputType } from '../type'

const DiscountForm = () => {
  const router = useRouter()
  const { discountsId } = useParams()
  const { data: discountDetail } = useDiscountDetail(discountsId as string)

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty },
  } = useForm<DiscountCreateInputType>({
    defaultValues: {
      code: '',
      discountRate: 0,
      validFrom: '',
      validTo: '',
      maxUsage: 0,
      currentUsage: 0,
      isActive: true,
    },
    resolver: zodResolver(DiscountCreateInputSchema),
  })

  useEffect(() => {
    if (discountDetail) {
      const { code, discountRate, validFrom, validTo, maxUsage, currentUsage, isActive } = discountDetail
      setValue('code', code as string)
      setValue('discountRate', discountRate as number)
      setValue('validFrom', validFrom as string)
      setValue('validTo', validTo as string)
      setValue('maxUsage', maxUsage as number)
      setValue('currentUsage', currentUsage as number)
      setValue('isActive', isActive as boolean)
    }
  }, [setValue, discountDetail])

  const { mutate: createDiscount, isPending: isPendingCreate } = useDiscountCreate(setError)
  const { mutate: updateDiscount, isPending: isPendingUpdate } = useDiscountUpdate(setError)

  const onSubmit: SubmitHandler<DiscountCreateInputType> = (data) => {
    const submitData = { ...data, id: discountsId as string }

    const successCallback = () => {
      enqueueSnackbar(discountsId ? 'Cập nhật thành công' : 'Thêm mới thành công', {
        variant: 'success',
      })
      router.push(discountsId ? `/discounts/${discountsId}/detail` : '/discounts')
    }

    if (discountsId) {
      updateDiscount(submitData, { onSuccess: successCallback })
    } else {
      createDiscount(data, { onSuccess: successCallback })
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={discountsId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row" spacing={2}>
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={discountDetail?.id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>

          <Stack direction="column" gap={2}>
            <Input
              control={control}
              name="code"
              label="Mã giảm giá"
              labelLeft
              placeholder="Mã giảm giá"
              fullWidth
            />
            <Input
              control={control}
              name="discountRate"
              label="Tỷ lệ giảm giá"
              labelLeft
              placeholder="Tỷ lệ giảm giá"
              fullWidth
              type="number"
            />
            <DatePicker
              control={control}
              name="validFrom"
              label="Ngày bắt đầu"
              labelLeft
              placeholder="Ngày bắt đầu"
              fullWidth
            />
            <DatePicker
              control={control}
              name="validTo"
              label="Ngày kết thúc"
              labelLeft
              placeholder="Ngày kết thúc"
              fullWidth
            />
            <Input
              control={control}
              name="maxUsage"
              label="Số lần sử dụng tối đa"
              labelLeft
              placeholder="Số lần sử dụng tối đa"
              fullWidth
              type="number"
            />
            <DetailItem
              label="Ngày tạo"
              value={discountDetail?.createdAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
            <DetailItem
              label="Ngày cập nhật"
              value={discountDetail?.updatedAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { DiscountForm }
