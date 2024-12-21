import { ProductCard } from '@/libs/components/ProductCard/ProductCard'
import { OutlineButton } from '@/libs/styles'
import { getAllPackage } from '@/service/product.service'
import { Grid2, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const PackageNew = () => {
  const router = useRouter()
  const { data } = useQuery({
    queryKey: ['all-package'],
    queryFn: () => getAllPackage(),
  })

  return (
    <Stack mt={10} gap={6} px={3}>
      <Typography fontWeight={400} fontSize={32} textAlign="center">
        Danh sách gói thiết bị nổi bật
      </Typography>

      <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data &&
          data?.map((device, index) => (
            <Grid2 key={index} size={{ xs: 2, sm: 4, md: 2.4 }}>
              <ProductCard {...device} type="package" />
            </Grid2>
          ))}
      </Grid2>

      <Stack alignItems="center">
        <OutlineButton sx={{ width: 200 }} onClick={() => router.push('/packages')}>
          Xem tất cả
        </OutlineButton>
      </Stack>
    </Stack>
  )
}
