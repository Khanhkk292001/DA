'use client'

import { SearchResult } from '@/libs/components/Layout/Header/Search'
import { ProductCard } from '@/libs/components/ProductCard/ProductCard'
import request from '@/libs/configs/axios/axios'
import { Box, Breadcrumbs, Grid, Link, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export const Search = () => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')

  const { data } = useQuery({
    queryKey: ['search', keyword],
    queryFn: async (): Promise<{ data: SearchResult[]; total: number }> => {
      const response = await request.get(`/equipments/search?keyword=${keyword}`)
      return response.data
    },
    enabled: !!keyword,
  })

  return (
    <Box pb={10} px={2} bgcolor="white">
      <Box paddingX={0} borderTop="1px solid #DDDD" borderBottom="1px solid #DDDD" mb={1}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: 3, color: 'black', fontSize: '14px', fontWeight: 400 }}>
          <Link underline="none" color="black" href="/">
            Trang chủ
          </Link>
          <Typography sx={{ color: 'black', fontSize: '14px', fontWeight: 400 }}>
            {searchParams.get('keyword')}
          </Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={5} alignItems={'center'}>
        <Grid item xs={12} md={6}>
         
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <Typography variant="h1" component="h1" margin={'20px 0'}>
            {searchParams.get('keyword')}
          </Typography> */}
        </Grid>
      </Grid>

      <Box
        sx={{
          paddingX: 10,
        }}
      >
        <Typography variant="body2" component="p" margin={'20px 0'}>
          {(data && data.data?.length) ?? 0} sản phẩm
        </Typography>

        <Grid container spacing={4}>
          {data &&
            data.data.length > 0 &&
            data.data?.map((device) => (
              <Grid item xs={12} md={3} key={device?.id}>
                <ProductCard {...device} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  )
}
