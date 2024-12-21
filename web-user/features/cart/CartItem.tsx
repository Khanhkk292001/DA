import { deleteCart } from '@/service/cart.service'
import { Box, Stack, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { CartItemType } from './type'

const CartItem = (cart: CartItemType) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Carts'],
      })
      toast.success('Xóa thành công')
    },
    onError: () => {
      toast.error('Xóa thất bại')
    },
  })

  const handleDelete = () => {
    mutate(cart.id)
  }

  return (
    <Stack
      alignItems={{
        xs: 'flex-start',
        sm: 'center',
      }}
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{
        padding: 2,
        borderRadius: 2,
        mb: 1,
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          sx={{ width: 80, height: 80, mr: 2, borderRadius: 1, objectFit: 'cover' }}
          src={
            cart.equipment?.image ??
            cart.package.image ??
            'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
          }
          alt={cart.cartId}
        />
        <Box
          onClick={handleDelete}
          sx={{
            position: 'absolute',
            top: 0,
            left: '-10px',
            fontSize: '10px',
            color: 'white',
            backgroundColor: '#8f9bb3',
            width: 24,
            height: 24,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          Xóa
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {cart?.equipment?.name ?? cart?.package?.name ?? 'Chưa có tên'}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
          Số lượng: {cart.quantity}
        </Typography>
      </Box>

      <Box justifyContent="flex-end" width={200}>
        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
          Ngày tạo: {format(new Date(cart.createdAt), 'dd/MM/yyyy')}
        </Typography>
      </Box>
    </Stack>
  )
}

export default CartItem
