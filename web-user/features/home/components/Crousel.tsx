import Image from 'next/image'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export const Carousel = () => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 2500, disableOnInteraction: false }}
    >
      <SwiperSlide>
        <Image
          alt="slide 1"
          src="https://giadinhcamping.vn/wp-content/uploads/2023/11/do-camp-ban-ghe-doc-sach.jpeg"
          width={1920}
          height={600}
          style={{ objectFit: 'cover', width: '100%' }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          alt="slide 1"
          src="https://armyhaus.com/wp-content/uploads/2019/01/Complete-camping-essentials-810x402.jpg"
          width={1920}
          height={600}
          style={{ objectFit: 'cover', width: '100%' }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          alt="slide 1"
          src="https://phukiengiagoc.vn/wp-content/uploads/2021/02/O1CN01XvI5721URSSBtYc0A_1621402514-0-cib.jpg"
          width={1920}
          height={600}
          style={{ objectFit: 'cover', width: '100%' }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          alt="slide 1"
          src="https://chefstore.vn/public/images/2024/%C4%90%E1%BB%93%20d%C3%B9ng%20d%C3%A3%20ngo%E1%BA%A1i%20Chefstore.jpg"
          width={1920}
          height={600}
          style={{ objectFit: 'cover', width: '100%' }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          alt="slide 1"
          src="https://giadinhcamping.vn/wp-content/uploads/2023/11/do-camp-ban-ghe-doc-sach.jpeg"
          width={1920}
          height={600}
          style={{ objectFit: 'cover', width: '100%' }}
        />
      </SwiperSlide>
    </Swiper>
  )
}
