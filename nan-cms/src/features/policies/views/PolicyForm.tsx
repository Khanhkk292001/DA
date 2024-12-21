'use client'

import { DetailItem } from '@/features/article/components'
import { FormLayout, Input } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { usePolicyCreate, usePolicyDetail, usePolicyUpdate } from '../hooks'
import { PolicyCreateInputSchema, PolicyCreateInputType } from '../type'

const PolicyForm = () => {
  const router = useRouter()
  const { policiesId } = useParams()  
  const { data: policyDetail } = usePolicyDetail(policiesId as string)  

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty },
  } = useForm<PolicyCreateInputType>({
    defaultValues: {
      description: '',
      depositRate: 0,
      damageProcessingFee: 0,
    },
    resolver: zodResolver(PolicyCreateInputSchema),
  })

  useEffect(() => {
    if (policyDetail) {
      const { description, depositRate, damageProcessingFee } = policyDetail
      setValue('description', description as string)
      setValue('depositRate', depositRate as number)
      setValue('damageProcessingFee', damageProcessingFee as number)
    }
  }, [setValue, policyDetail])

  const { mutate: createPolicy, isPending: isPendingCreate } = usePolicyCreate(setError)
  const { mutate: updatePolicy, isPending: isPendingUpdate } = usePolicyUpdate(setError)

  const onSubmit: SubmitHandler<PolicyCreateInputType> = (data) => {
    const submitData = { ...data, id: policiesId as string }

    const successCallback = () => {
      enqueueSnackbar(policiesId ? 'Cập nhật thành công' : 'Thêm mới thành công', {
        variant: 'success',
      })
      router.push(policiesId ? `/policies/${policiesId}/detail` : '/policies')
    }

    if (policiesId) {
      updatePolicy(submitData, { onSuccess: successCallback })
    } else {
      createPolicy(data, { onSuccess: successCallback })
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={policiesId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row" spacing={2}>
        <Stack spacing={2} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={policyDetail?.id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>

          <Stack direction="column" gap={2}>
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
              name="depositRate"
              label="Tỷ lệ đặt cọc"
              labelLeft
              placeholder="Tỷ lệ đặt cọc"
              fullWidth
            />
            <Input
              control={control}
              name="damageProcessingFee"
              label="Phí xử lý hỏng hóc"
              labelLeft
              placeholder="Phí xử lý hỏng hóc"
              fullWidth
            />
            <DetailItem
              label="Ngày tạo"
              value={policyDetail?.createdAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
            <DetailItem
              label="Ngày cập nhật"
              value={policyDetail?.updatedAt || '-'}
              valueSx={{ width: { xs: '100%', lg: 200 } }}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { PolicyForm }
