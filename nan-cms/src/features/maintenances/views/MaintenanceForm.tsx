'use client'

import { DetailItem } from '@/features/article/components'
import { getEquipments } from '@/libs/api/equipments'
import { DatePicker } from '@/libs/components/DatePicker'
import { FormLayout, Input, Select } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMaintenanceCreate, useMaintenanceDetail, useMaintenanceUpdate } from '../hooks'
import { MaintenanceCreateInputSchema, MaintenanceCreateInputType } from '../type'

const MaintenanceForm = () => {
  const router = useRouter()
  const { maintenancesId } = useParams()
  const { data: maintenanceDetail } = useMaintenanceDetail(maintenancesId as string)

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty },
  } = useForm<MaintenanceCreateInputType>({
    defaultValues: {
      maintenanceDate: '',
      description: '',
      maintenanceCost: 0,
      equipmentId: '',
      status: 'pending',
      code: '',
    },
    resolver: zodResolver(MaintenanceCreateInputSchema),
  })

  useEffect(() => {
    if (maintenanceDetail) {
      const { maintenanceDate, description, maintenanceCost, equipmentId, code } = maintenanceDetail
      setValue('maintenanceDate', maintenanceDate as string)
      setValue('description', description as string)
      setValue('maintenanceCost', maintenanceCost as number)
      setValue('equipmentId', equipmentId as string)
      setValue('code', code as string)
      setValue('status', maintenanceDetail?.status ?? 'pending')
    }
  }, [setValue, maintenanceDetail])

  const { mutate: createMaintenance, isPending: isPendingCreate } = useMaintenanceCreate(setError)
  const { mutate: updateMaintenance, isPending: isPendingUpdate } = useMaintenanceUpdate(setError)

  const onSubmit: SubmitHandler<MaintenanceCreateInputType> = (data) => {
    const submitData = { ...data, id: maintenancesId as string }

    const successCallback = () => {
      enqueueSnackbar(maintenancesId ? 'Cập nhật thành công' : 'Thêm mới thành công', {
        variant: 'success',
      })
      router.push(maintenancesId ? `/maintenances/${maintenancesId}/detail` : '/maintenances')
    }

    if (maintenancesId) {
      updateMaintenance(submitData, { onSuccess: successCallback })
    } else {
      createMaintenance(data, { onSuccess: successCallback })
    }
  }

  const { data: equipments } = useQuery({
    queryKey: ['equipments'],
    queryFn: getEquipments,
  })

  const equipmentOptions =
    equipments?.map((equipment) => ({
      label: equipment.name,
      value: equipment.id,
    })) ?? []

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={maintenancesId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row" spacing={2}>
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={maintenanceDetail?.id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>

          <Stack direction="column" gap={2}>
            <DatePicker
              control={control}
              name="maintenanceDate"
              label="Ngày bảo trì"
              labelLeft
              placeholder="Ngày bảo trì"
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
              name="maintenanceCost"
              label="Chi phí bảo trì"
              labelLeft
              placeholder="Nhập chi phí bảo trì"
              type="number"
              fullWidth
            />
            <Input
              control={control}
              name="code"
              label="Mã vạch"
              labelLeft
              placeholder="Mã vạch"
              type="text"
              fullWidth
            />

            {maintenanceDetail?.status && (
              <Select
                control={control}
                name="status"
                label="Trạng thái"
                labelLeft
                placeholder="Trạng thái"
                fullWidth
                hiddenEmpty
                options={[
                  {
                    label: 'Đang chờ',
                    value: 'pending',
                  },
                  {
                    label: 'Hoàn thành',
                    value: 'completed',
                  },
                ]}
              />
            )}
            <Select
              control={control}
              name="equipmentId"
              label="Thiết bị"
              labelLeft
              placeholder="Thiết bị"
              fullWidth
              hiddenEmpty
              options={equipmentOptions}
            />
            <DetailItem
              label="Ngày tạo"
              value={maintenanceDetail?.createdAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
            <DetailItem
              label="Ngày cập nhật"
              value={maintenanceDetail?.updatedAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { MaintenanceForm }
