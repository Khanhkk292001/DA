'use client'

import { getCarts } from '@/service/cart.service'
import { getDiscountPagination } from '@/service/discount.service'
import { Box, Breadcrumbs, Divider, Grid, Link, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { Fragment, useState } from 'react'
import { NewRelease } from '../home/components'
import CartItem from './CartItem'
import OrderInfo from './OrderInfo'
import VoucherSlider from './VoucherList'

const ShoppingCart = () => {
  const { data } = useQuery({
    queryKey: ['Carts'],
    queryFn: getCarts,
  })

  const [formFilter, setFormFilter] = useState({
    page: 1,
    limit: 2,
  })

  const { data: discounts, isLoading } = useQuery({
    queryKey: ['allDevice', JSON.stringify(formFilter)],
    queryFn: () => getDiscountPagination(formFilter),
  })


  return (
    <Box
      sx={{
        paddingX: {
          xs: 2,
          sm: 4,
          md: 6,
          lg: 8,
        },
      }}
      mb={10}
    >
      <Box sx={{ marginY: 5, borderTop: '1px solid', borderBottom: '1px solid', borderColor: '#ccc' }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ paddingY: 1, color: 'black', fontSize: '14px', fontWeight: 400 }}>
          <Link underline="none" color="black" href="/">
            Trang chủ
          </Link>
          <Typography sx={{ color: 'black', fontSize: '14px', fontWeight: 400 }}>Giỏ hàng</Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={3} sx={{ background: 'white' }} pb={5} pr={2}>
        <Grid item xs={12} md={8}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Giỏ hàng của bạn
            </Typography>

            <Typography sx={{ mb: 2 }}>
              Bạn đang có <b>{data?.items?.length ?? 0} sản phẩm</b> trong giỏ hàng
            </Typography>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ border: '2px solid #eae4e8', borderRadius: 2 }}>
            {isEmpty(data?.items) ? (
              <Stack height={200} justifyContent="center" alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Giỏ hàng của bạn đang trống
                </Typography>
              </Stack>
            ) : (
              data?.items?.map((item) => (
                <Fragment key={item.id}>
                  <CartItem {...item} />
                  <Divider sx={{ mx: 2 }} />
                </Fragment>
              ))
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <OrderInfo cart={data} />
          <VoucherSlider vouchers={discounts?.data ?? []} />
        </Grid>
      </Grid>

      <NewRelease />
    </Box>
  )
}

export default ShoppingCart
