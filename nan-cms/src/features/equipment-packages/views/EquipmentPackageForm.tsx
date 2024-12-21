'use client'

import { DetailItem } from '@/features/article/components'
import { getEquipments } from '@/libs/api/equipments'
import { FormLayout, Input, UploadImage } from '@/libs/components/Form'
import { TagInput } from '@/libs/components/Form/TagInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useEquipmentPackageCreate,
  useEquipmentPackageDetail,
  useEquipmentPackageUpdate,
} from '../hooks'
import { EquipmentPackageCreateInputSchema, EquipmentPackageCreateInputType } from '../type'

const EquipmentPackageForm = () => {
  const router = useRouter()
  const { packageId } = useParams()
  const { data: equipmentPackageDetail } = useEquipmentPackageDetail(packageId as string)

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty },
  } = useForm<EquipmentPackageCreateInputType>({
    defaultValues: {
      name: '',
      description: '',
      basePrice: 0,
      rentalPrice: 0,
      image: '',
      equipmentIds: [],
    },
    resolver: zodResolver(EquipmentPackageCreateInputSchema),
    values: {
      description: equipmentPackageDetail?.description || '',
      name: equipmentPackageDetail?.name || '',
      basePrice: equipmentPackageDetail?.basePrice || 0,
      rentalPrice: equipmentPackageDetail?.rentalPrice || 0,
      image: equipmentPackageDetail?.image || '',
      equipmentIds: equipmentPackageDetail?.equipments.map((e) => String(e.equipmentId)) || [],
    },
  })

  const { data: equipments } = useQuery({
    queryKey: ['equipments'],
    queryFn: getEquipments,
  })

  useEffect(() => {
    if (equipmentPackageDetail) {
      const { name, description, basePrice, rentalPrice, image } = equipmentPackageDetail
      setValue('name', name as string)
      setValue('description', description as string)
      setValue('basePrice', basePrice as number)
      setValue('rentalPrice', rentalPrice as number)
      setValue('image', image as string)
      setValue(
        'equipmentIds',
        equipmentPackageDetail.equipments.map((e) => String(e.equipmentId)),
      )
    }
  }, [setValue, equipmentPackageDetail])

  const { mutate: createEquipmentPackage, isPending: isPendingCreate } =
    useEquipmentPackageCreate(setError)
  const { mutate: updateEquipmentPackage, isPending: isPendingUpdate } =
    useEquipmentPackageUpdate(setError)

  const onSubmit: SubmitHandler<EquipmentPackageCreateInputType> = (data) => {
    console.log(data)

    const submitData = { ...data, id: packageId as string }

    const successCallback = () => {
      enqueueSnackbar(packageId ? 'Cập nhật thành công' : 'Thêm mới thành công', {
        variant: 'success',
      })
      router.push(packageId ? `/package/${packageId}/detail` : '/package')
    }

    if (packageId) {
      updateEquipmentPackage(submitData, { onSuccess: successCallback })
    } else {
      createEquipmentPackage(data, { onSuccess: successCallback })
    }
  }

  const equipmentOptions =
    equipments?.map((equipment) => ({
      label: equipment.name,
      value: equipment.id,
    })) ?? []

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={packageId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row" spacing={2}>
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={equipmentPackageDetail?.id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>

          <Stack direction="column" gap={2}>
            <Input
              control={control}
              name="name"
              label="Tên gói"
              labelLeft
              placeholder="Tên gói"
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
              name="basePrice"
              label="Giá gói"
              labelLeft
              placeholder="Giá gói"
              fullWidth
            />
            <Input
              control={control}
              type="number"
              name="rentalPrice"
              label="Giá cho thuê"
              labelLeft
              placeholder="Giá cho thuê"
              fullWidth
            />
            <UploadImage control={control} name="image" label="Hình ảnh" labelLeft />
            {equipmentOptions && (
              <TagInput
                width="671px"
                control={control}
                name="equipmentIds"
                label="Thiết bị"
                labelLeft
                options={equipmentOptions}
                multiple
              />
            )}

            <DetailItem
              label="Ngày tạo"
              value={equipmentPackageDetail?.createdAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
            <DetailItem
              label="Ngày cập nhật"
              value={equipmentPackageDetail?.updatedAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { EquipmentPackageForm }
