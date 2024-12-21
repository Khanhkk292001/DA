'use client'

import { Input } from '@/libs/components/Form'
import request from '@/libs/config/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ModalCustom } from './Modal'

interface ModalReportProps {
  open: boolean
  handleClose: () => void
  feedbackId: string
}

export const ModalFeedback: React.FC<ModalReportProps> = ({ handleClose, open, feedbackId }) => {
  const FeedbackInputSchema = z.object({
    adminResponse: z.string().min(1, {
      message: 'Phản hồi không được để trống',
    }),
  })

  type FeedbackInputType = z.infer<typeof FeedbackInputSchema>

  const queryClient = useQueryClient()

  const { control, handleSubmit, reset } = useForm<FeedbackInputType>({
    defaultValues: {
      adminResponse: '',
    },
    resolver: zodResolver(FeedbackInputSchema),
  })

  const { mutate } = useMutation({
    mutationFn: async (data: FeedbackInputType) => {
      await request.patch(`/feedbacks/${feedbackId}/reply`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
      enqueueSnackbar('Phản hồi thành công', { variant: 'success' })
      reset()
      handleClose()
    },
    onError: () => {
      enqueueSnackbar('Phản hồi thất bại', { variant: 'error' })
    },
  })

  const onSubmit: SubmitHandler<FeedbackInputType> = (data) => {
    mutate(data)
  }

  return (
    <ModalCustom onClose={handleClose} open={open}>
      <Stack gap={2} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="column"
          alignItems="center"
          gap={2}
          border="1px solid #ddd"
          p={2}
          borderRadius={2}
        >
          <Input control={control} label="Nội dung" name="adminResponse" fullWidth />
        </Stack>

        <Button
          sx={{
            fontWeight: 700,
            flex: 1,
            backgroundColor: '#1976d2',
            color: '#fff',
            borderRadius: 0,
          }}
          type="submit"
        >
          Phản hồi
        </Button>
      </Stack>
    </ModalCustom>
  )
}
