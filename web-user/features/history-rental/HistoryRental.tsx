'use client'

import { getHistoryRentals } from '@/service/rental.service'
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { RentalHistoryItem } from './components/RentalHistoryItem'

export const HistotyRental = () => {
  const { data } = useQuery({
    queryKey: ['Rentals-History'],
    queryFn: getHistoryRentals,
  })

  return (
    <Stack
      px={{
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
      }}
      pb={10}
      spacing={4}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          marginTop: 3,
          py: 1,
          color: 'black',
          fontSize: '14px',
          fontWeight: 400,
          borderTop: '1px solid #DDDD',
          borderBottom: '1px solid #DDDD',
        }}
      >
        <Link underline="none" color="black" href="/">
          Trang chủ
        </Link>
        <Typography sx={{ color: 'black', fontSize: '14px', fontWeight: 400 }}>Lịch sử thuê</Typography>
      </Breadcrumbs>

      <Stack spacing={2}>{data && data.map((rental) => <RentalHistoryItem key={rental.id} rental={rental} />)}</Stack>
    </Stack>
  )
}
