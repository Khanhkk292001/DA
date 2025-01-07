'use client'

import { DetailItem } from '@/features/article/components'
import { FormLayout, Input } from '@/libs/components/Form'
import { formatDate } from '@/utils/format'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEquipmentCreate, useEquipmentDetail, useEquipmentUpdate } from '../hooks'
import { EquipmentCreateInputSchema, EquipmentCreateInputType } from '../type'

const ReturnForm = () => {
  const router = useRouter()
  const { equipmentsId } = useParams()
  const { data: equipmentDetail } = useEquipmentDetail(equipmentsId as string)

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty },
  } = useForm<EquipmentCreateInputType>({
    defaultValues: {
      name: '',
      image: '',
      description: '',
      basePrice: 0,
      rentalPrice: 0,
      stock: 0,
      categoryId: '',
    },
    resolver: zodResolver(EquipmentCreateInputSchema),
  })

  useEffect(() => {
    if (equipmentDetail) {
      const { name, image, description, basePrice, rentalPrice, stock, categoryId } =
        equipmentDetail
      setValue('name', name as string)
      setValue('image', image as string)
      setValue('description', description as string)
      setValue('basePrice', basePrice as number)
      setValue('rentalPrice', rentalPrice as number)
      setValue('stock', stock as number)
      setValue('categoryId', categoryId as string)
      setValue('image', image as string)
    }
  }, [setValue, equipmentDetail])

  const { mutate: createEquipment, isPending: isPendingCreate } = useEquipmentCreate(setError)
  const { mutate: updateEquipment, isPending: isPendingUpdate } = useEquipmentUpdate(setError)

  const onSubmit: SubmitHandler<EquipmentCreateInputType> = (data) => {
    const submitData = { ...data, id: equipmentsId as string }

    const successCallback = () => {
      enqueueSnackbar(
        equipmentsId ? 'Cập nhật thiết bị thành công' : 'Thêm mới thiết bị thành công',
        {
          variant: 'success',
        },
      )
      router.push(equipmentsId ? `/equipments/${equipmentsId}/detail` : '/equipments')
    }

    if (equipmentsId) {
      updateEquipment(submitData, { onSuccess: successCallback })
    } else {
      createEquipment(data, { onSuccess: successCallback })
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={equipmentsId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row" spacing={2}>
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={equipmentDetail?.id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>

          <Stack direction="column" gap={2}>
            <Input
              control={control}
              name="name"
              label="Id thiết bị"
              labelLeft
              placeholder="Id thiết bị"
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

            <Input
              control={control}
              type="number"
              name="stock"
              label="Số lượng"
              labelLeft
              placeholder="Số lượng"
              fullWidth
            />

            <DetailItem label="Ngày tạo" value={formatDate(equipmentDetail?.createdAt as string)} />
            <DetailItem
              label="Ngày cập nhật"
              value={formatDate(equipmentDetail?.updatedAt as string)}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { ReturnForm }
