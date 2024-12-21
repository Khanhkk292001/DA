import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import './style.module.css'

import { Box } from '@mui/material'
import Image from 'next/image'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'

export const Swipper: React.FC = (data) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)

  return (
    <Box width="50%">
      <Swiper
        spaceBetween={10}
        navigation={true}
        loop={true}
        thumbs={{
          swiper:
            thumbsSwiper && !(thumbsSwiper as any).destroyed
              ? thumbsSwiper
              : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <SwiperSlide key={index}>
              <Image
                src="https://product.hstatic.net/200000719085/product/81_44beb0c7734440d28f3706a1344b727f_large.jpg"
                width={100}
                height={300}
                style={{
                  objectFit: 'contain',
                  aspectRatio: '1 / 2.5',
                  width: '100%',
                }}
                alt="card-product"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={8}
        slidesPerView={8}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <SwiperSlide key={index}>
              <Image
                src="https://product.hstatic.net/200000719085/product/81_44beb0c7734440d28f3706a1344b727f_large.jpg"
                width={100}
                height={100}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  aspectRatio: '1 / 2.5',
                }}
                alt="card-product"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
}
