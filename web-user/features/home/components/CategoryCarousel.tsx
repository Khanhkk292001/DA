import { getCategries } from '@/service/category.service'
import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import '../styles/CategoryCarousel.module.css'
import { CategoryCard } from '../styles/styled'

export function CategoryCarousel() {
  const { data } = useQuery({
    queryKey: ['CATEGORY'],
    queryFn: getCategries,
  })

  const router = useRouter()

  return (
    <Box mt={10}>
      <Typography fontSize={32} fontWeight={500} textAlign="center" marginBottom={3}>
        Danh mục sản phẩm
      </Typography>

      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        modules={[Navigation, Autoplay, Pagination]}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
        style={{ padding: '20px' }}
      >
        {data &&
          data.map((category) => (
            <SwiperSlide key={category.id}>
              <CategoryCard>
                <Image
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
                  alt="image"
                  width={300}
                  height={280}
                  style={{ width: '100%', height: '100%' }}
                />

                <Typography>{category.name}</Typography>
              </CategoryCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  )
}
