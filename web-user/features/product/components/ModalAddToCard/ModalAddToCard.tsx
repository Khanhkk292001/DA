'use client'

import { Input } from '@/libs/components/Form'
import { ModalCustom } from '@/libs/components/Modal'
import { base } from '@/libs/configs'
import { createCart } from '@/service/cart.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CartInputSchema, CartInputType } from '../../type'

interface ModalAddToCardProps {
  open: boolean
  handleClose: () => void
}

export const ModalAddToCard: React.FC<ModalAddToCardProps> = ({ handleClose, open }) => {
  const { id } = useParams()
  const { mutate } = useMutation({
    mutationFn: createCart,
    onSuccess: () => {
      alert('Success')
    },
    onError: () => {
      alert('Error')
    },
  })

  const { control, handleSubmit } = useForm<CartInputType>({
    defaultValues: {
      equipmentId: '',
      packageId: '',
      quantity: 1,
    },
    resolver: zodResolver(CartInputSchema),
  })

  const onSubmit: SubmitHandler<CartInputType> = (data) => {
    mutate({
      equipmentId: String(id),
      quantity: data.quantity,
    })
  }

  return (
    <ModalCustom onClose={handleClose} open={open}>
      <Stack gap={2} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Input control={control} label="Số lượng" name="quantity" type="number" fullWidth />

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
          Thêm vào giỏ hàng
        </Button>
      </Stack>
    </ModalCustom>
  )
}
