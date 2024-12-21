'use client'

import { Input } from '@/libs/components/Form'
import { UploadImage } from '@/libs/components/Form/UploadImg'
import { ModalCustom } from '@/libs/components/Modal'
import { base } from '@/libs/configs'
import { useGetMe } from '@/libs/hooks'
import { damageReport } from '@/service/rental.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { DamageReportInputSchema, DamageReportInputType } from '../type'

interface ModalReportProps {
  open: boolean
  handleClose: () => void
  equipmentId: string
}

export const ModalReport: React.FC<ModalReportProps> = ({ handleClose, open, equipmentId }) => {
  const { data: meData } = useGetMe()

  const { control, handleSubmit, reset } = useForm<DamageReportInputType>({
    defaultValues: {
      description: '',
      equipmentId,
      image: '',
    },
    resolver: zodResolver(DamageReportInputSchema),
  })

  const { mutate } = useMutation({
    mutationFn: damageReport,
    onSuccess: () => {
      toast.success('Báo hỏng thành công')
      handleClose()
      reset()
    },
    onError: () => {
      toast.error('Báo hỏng thất bại')
    },
  })

  const onSubmit: SubmitHandler<DamageReportInputType> = (data) => {
    if (equipmentId) {
      mutate({
        ...data,
        equipmentId,
      })
    }
  }

  return (
    <ModalCustom onClose={handleClose} open={open}>
      <Stack gap={2} component="form" onSubmit={handleSubmit(onSubmit)}>
        <UploadImage control={control} name="image" content="Ảnh thiết bị hỏng" />

        <Input control={control} label="Chi tiết" name="description" fullWidth />

        <Button
          sx={{
            fontWeight: 700,
            flex: 1,
            backgroundColor: base.primary,
            color: base.white,
            borderRadius: 0,
          }}
          type="submit"
        >
          Báo hỏng
        </Button>
      </Stack>
    </ModalCustom>
  )
}
