import { EquipmentType } from '@/features/home'
import { base } from '@/libs/configs'
import { createCart } from '@/service/cart.service'
import { formatMoney } from '@/utils'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import FlightIcon from '@mui/icons-material/Flight'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PercentIcon from '@mui/icons-material/Percent'
import ShieldIcon from '@mui/icons-material/Shield'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Stack, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

export const ProductInformation: React.FC<
  EquipmentType & {
    type?: 'equipment' | 'package'
  }
> = ({ type = 'equipment', ...data }) => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()
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
              data?.image ??
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
              {data?.name}
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
      return
    }

    if (type === 'package') {
      mutate({
        packageId: String(id),
        quantity: quantity,
      })

      return
    }

    mutate({
      equipmentId: String(id),
      quantity: quantity,
      price: data.rentalPrice ?? 10,
    })
  }

  return (
    <Stack flex={1} minHeight={750} spacing={4.5}>
      <Stack gap={2}>
        <Typography maxWidth={500} height="auto" fontSize={28} lineHeight="40px" fontWeight={760}>
          {data?.name}
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} gap={1}>
          <Typography fontSize={16} lineHeight="26px">
            Mã: <b>{data?.id}</b>
          </Typography>
          <Box width="1px" height="100%" bgcolor="#DDDD" />
          <Typography fontSize={16} lineHeight="26px">
            Tình trạng: <b>{data?.stock}</b> 
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={0.5}>
        <Typography fontSize={20} lineHeight="32px" fontWeight={600}>
          Giá thuê: {formatMoney(data.rentalPrice)}
        </Typography>
      </Stack>

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

      <Divider />

      <Typography fontSize={20} lineHeight="32px">
        <b>Thông tin sản phẩm: </b> {data?.description}
      </Typography>

      <Stack spacing={1}>
        <Stack direction="row" gap={1}>
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

          <Button
            onClick={handleAddToCart}
            sx={{
              fontWeight: 700,
              flex: 1,
              backgroundColor: base.primary,
              color: base.white,
              borderRadius: 0,
            }}
          >
            Thuê ngay
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={4}>
        {/* Khuyến mãi */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Khuyến mãi dành cho bạn
          </Typography>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <LocalShippingIcon color="primary" />
              <Typography variant="body2">Miễn Phí Vận Chuyển Chiều Về Khi thuê từ 5 đồ trong cùng đơn hàng</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <PercentIcon color="primary" />
              <Typography variant="body2">Giảm 5% Khi Thuê Trong 24h Tại Hà Nội</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <FlightIcon color="primary" />
              <Typography variant="body2">Chương Trình Combo Du Lịch</Typography>
            </Stack>
          </Stack>
        </Grid>

        {/* Chính sách */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Chính sách bán hàng
          </Typography>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <ShieldIcon color="primary" />
              <Typography variant="body2">Cam kết 100% chính hãng</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <ThumbUpIcon color="primary" />
              <Typography variant="body2">Hỗ trợ 24/7</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <DeliveryDiningIcon color="primary" />
              <Typography variant="body2">Shipper nhận và lấy tại nhà</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}
