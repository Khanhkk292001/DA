'use client'

import { DetailItem } from '@/features/article/components'
import { FormLayout, Input } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRepairRecordCreate, useRepairRecordDetail, useRepairRecordUpdate } from '../hooks'
import { RepairRecordCreateInputSchema, RepairRecordCreateInputType } from '../type'

const RepairRecordForm = () => {
  const router = useRouter()
  const { repairRecordId } = useParams()
  const { data: repairRecordDetail } = useRepairRecordDetail(repairRecordId as string)

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty },
  } = useForm<RepairRecordCreateInputType>({
    defaultValues: {
      equipmentId: '',
      repairDate: '',
      failureCause: '',
      partsReplaced: '',
      repairCost: undefined,
      warranty: '',
    },
    resolver: zodResolver(RepairRecordCreateInputSchema),
  })

  useEffect(() => {
    if (repairRecordDetail) {
      const { equipmentId, failureCause, repairDate, partsReplaced, repairCost, warranty } =
        repairRecordDetail
      setValue('equipmentId', equipmentId as string)
      setValue('failureCause', failureCause as string)
      setValue('repairDate', repairDate as string)
      setValue('partsReplaced', partsReplaced || '')
      setValue('repairCost', repairCost || undefined)
      setValue('warranty', warranty || '')
    }
  }, [setValue, repairRecordDetail])

  const { mutate: createRepairRecord, isPending: isPendingCreate } = useRepairRecordCreate(setError)
  const { mutate: updateRepairRecord, isPending: isPendingUpdate } = useRepairRecordUpdate(setError)

  const onSubmit: SubmitHandler<RepairRecordCreateInputType> = (data) => {
    const submitData = { ...data, id: repairRecordId as string }

    const successCallback = () => {
      enqueueSnackbar(repairRecordId ? 'Cập nhật thành công' : 'Thêm mới thành công', {
        variant: 'success',
      })
      router.push(repairRecordId ? `/repair-records/${repairRecordId}/detail` : '/repair-records')
    }

    if (repairRecordId) {
      updateRepairRecord(submitData, { onSuccess: successCallback })
    } else {
      createRepairRecord(data, { onSuccess: successCallback })
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={repairRecordId ? 'Cập nhật bản ghi sửa chữa' : 'Tạo mới bản ghi sửa chữa'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row" spacing={2}>
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={repairRecordDetail?.id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>

          <Stack direction="column" gap={2}>
            <Input
              control={control}
              name="equipmentId"
              label="Mã thiết bị"
              labelLeft
              placeholder="Mã thiết bị"
              fullWidth
            />
            <Input
              control={control}
              name="failureCause"
              label="Nguyên nhân hư hỏng"
              labelLeft
              placeholder="Nguyên nhân hư hỏng"
              fullWidth
            />
            <Input
              control={control}
              name="repairDate"
              label="Ngày sửa chữa"
              labelLeft
              placeholder="Ngày sửa chữa"
              fullWidth
              type="date"
            />
            <Input
              control={control}
              name="partsReplaced"
              label="Linh kiện thay thế"
              labelLeft
              placeholder="Linh kiện thay thế"
              fullWidth
            />
            <Input
              control={control}
              name="repairCost"
              label="Chi phí sửa chữa"
              labelLeft
              placeholder="Chi phí sửa chữa"
              fullWidth
              type="number"
            />
            <Input
              control={control}
              name="warranty"
              label="Bảo hành"
              labelLeft
              placeholder="Bảo hành"
              fullWidth
            />
            <DetailItem
              label="Ngày tạo"
              value={repairRecordDetail?.createdAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
            <DetailItem
              label="Ngày cập nhật"
              value={repairRecordDetail?.updatedAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { RepairRecordForm }
