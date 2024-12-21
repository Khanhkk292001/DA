import { OutlineButton } from '@/libs/styles'
import { Stack, Typography } from '@mui/material'
import Image from 'next/image'

export const News = () => {
  return (
    <Stack flexDirection="row" width="100%" px={4} gap={4} mt={10}>
      <NewsCard />
      <NewsCard />
    </Stack>
  )
}

const NewsCard = () => {
  return (
    <Stack flex={1} alignItems="center" gap={4}>
     <Stack gap={4} alignItems="center">
        <Image
          alt="news"
          src="https://bizweb.dktcdn.net/100/163/023/files/glamping-6-553-jpeg.jpg?v=1629712772059"
          width={400}
          height={300}
          style={{ objectFit: 'contain', width: '100%' }}
        />

        <Typography fontWeight={400} fontSize={40} px={2} lineHeight={1}>
          Cho thuê đồ
        </Typography>

        <Typography fontWeight={200} fontSize={18} px={2}>
        Chúng tôi mang đến dịch vụ cho thuê thiết bị đa dạng, đáp ứng mọi nhu cầu của khách hàng. 
        Với nhiều lựa chọn tiện ích và ưu đãi hấp dẫn, bạn có thể dễ dàng tìm được thiết bị phù hợp cho mọi dự án, 
        từ đèn flash, máy quay, máy ảnh, đồ du lịch, đồ cắm trại, đồ gia dụng đến các phụ kiện hỗ trợ khác.
        </Typography>
      </Stack>

      <OutlineButton sx={{ width: 200, fontSize: 12 }}>Vào Xem Ngay</OutlineButton>
    </Stack>
  )
}
