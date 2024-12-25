'use client'

import { EquipmentType } from '@/features'
import { base } from '@/libs/configs'
import { createCart } from '@/service/cart.service'
import { formatMoney } from '@/utils'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Card, CardContent, CardMedia, IconButton, Modal, Stack, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface ProductDetailModalProps {
  open: boolean
  handleClose: () => void
  product: EquipmentType
  type: 'equipment' | 'package'
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ open, handleClose, product, type }) => {
  const router = useRouter()
  const handleRedirect = () => {
    if (type === 'equipment') {
      router.push(`/products/${product.id}`)
      return
    }

    if (type === 'package') {
      router.push(`/packages/${product.id}`)
    }
  }

  const [quantity, setQuantity] = useState(1)

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createCart,
    onSuccess: () => {
      setQuantity(1)
      queryClient.invalidateQueries({ queryKey: ['Carts'] })
      toast.success(
        <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, gap: 2 }}>
          {/* Hình ảnh sản phẩm */}
          <CardMedia
            component="img"
            src={
              product?.image ??
              'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
            }
            alt="product"
            sx={{
              width: 80,
              height: 80,
              borderRadius: 1,
              objectFit: 'cover',
            }}
          />

          {/* Nội dung thông báo */}
          <CardContent sx={{ padding: 0 }}>
            <Typography variant="body1" fontWeight={500} mb={1}>
              Đã thêm vào giỏ hàng thành công!
            </Typography>
            <Typography variant="h6" fontWeight={600} mb={0.5}>
              {product?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Số lượng: {quantity}
            </Typography>
          </CardContent>
        </Card>,
      )
    },
    onError: () => {
      toast.error('Thêm vào giỏ hàng thất bại')
    },
  })

  const handleAddToCart = () => {
    const isAuth = queryClient.getQueryData(['ME'])
    if (!isAuth) {
      router.push('/auth')
      toast.info('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng')
      return
    }

    if (type === 'package') {
      mutate({
        packageId: String(product.id),
        quantity: quantity,
        price: product.rentalPrice ?? 10,
      })

      return
    }

    mutate({
      equipmentId: String(product.id),
      quantity: quantity,
      price: product.rentalPrice ?? 10,
    })
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        {/* Close Button */}
        <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: 'flex', gap: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, flex: 1 }}>
            <Image
              src={
                product.image ??
                'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
              }
              alt={product.name}
              width={300}
              height={500}
              objectFit="cover"
              style={{
                width: '100%',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              flex: 1,
            }}
          >
            {/* Product Info Section */}
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Mã sản phẩm: {product.id}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Tình trạng: <span style={{ fontWeight: 600 }}>còn hàng</span>
            </Typography>
            <Typography variant="body1" fontWeight={600} sx={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              Giá thuê :{' '}
              <Typography component="span" fontSize={20} fontWeight={700}>
                {formatMoney(product.rentalPrice)}
              </Typography>
            </Typography>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Số lượng:
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 0,
                  padding: 1,
                  backgroundColor: '#f3f4f4',
                  minWidth: '30px',
                  height: '30px',
                  borderColor: '#f3f4f4',
                }}
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </Button>
              <Typography sx={{ mx: 2, border: '1px solid #f3f4f4' }}>{quantity}</Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 0,
                  padding: 1,
                  backgroundColor: '#f3f4f4',
                  minWidth: '30px',
                  height: '30px',
                  borderColor: '#f3f4f4',
                }}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </Box> */}
            {/* Add to Cart Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
              <Typography fontSize={20} lineHeight="32px" fontWeight={600} sx={{ mr: 2 }}>
                Số lượng:
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 0,
                  padding: 1,
                  backgroundColor: 'white',
                  minWidth: 40,
                  height: 40,
                  borderColor: '#f3f4f4',
                }}
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </Button>
              <Stack
                sx={{
                  mx: 1,
                  border: '1px solid #f3f4f4',
                  background: 'white',
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography>{quantity}</Typography>
              </Stack>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 0,
                  padding: 1,
                  backgroundColor: 'white',
                  minWidth: '40px',
                  height: '40px',
                  borderColor: '#f3f4f4',
                }}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </Box>

            <Stack>
              <Button
                variant="outlined"
                sx={{
                  flex: 1,
                  borderColor: base.primary,
                  color: base.primary,
                  fontWeight: 700,
                  borderRadius: 0,
                  ':hover': {
                    borderColor: base.primary,
                    color: base.primary,
                  },
                  ':focus': {
                    borderColor: base.primary,
                    color: base.primary,
                  },
                }}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
            </Stack>

            <Typography
              variant="body2"
              fontWeight={500}
              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={handleRedirect}
            >
              Xem chi tiết
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ProductDetailModal
