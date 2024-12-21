'use client'

import { getFeedbackByEquipmentIdOfPackageId, getPackageById } from '@/service/product.service'
import { Breadcrumbs, Divider, Link, Rating, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { NewRelease } from '../home/components'
import { ProductInformation } from '../product/components'
import { FAQComponent } from '../product/components/ProductInformation/FAQ'

export const PackageDetail = () => {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['productDetail'],
    queryFn: () => getPackageById(String(id)),
  })

  const router = useRouter()

  const { data: reviews } = useQuery({
    queryKey: ['reviews-items-package', id],
    queryFn: () =>
      getFeedbackByEquipmentIdOfPackageId({
        packageId: String(id),
      }),
    enabled: !!id,
  })

  if (!data) return null

  return (
    <Stack
      px={{
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
      }}
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
        <Typography sx={{ color: 'black', fontSize: '14px', fontWeight: 400 }}>Chi tiết sản phẩm</Typography>
        <Typography sx={{ color: 'black', fontSize: '14px', fontWeight: 400 }}>{data?.name}</Typography>
      </Breadcrumbs>

      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={{
          xs: 2,
          sm: 4,
        }}
      >
        <Stack flex={1}>
          {data?.equipments?.length > 0 ? (
            <Stack direction="row" gap={1} rowGap={1} flexWrap="wrap">
              {data.equipments.map((equipment, index) => (
                <Image
                  key={index}
                  src={
                    equipment.equipment.image ??
                    'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
                  }
                  alt={equipment.equipment.name ?? 'image'}
                  width={200}
                  height={200}
                  onClick={() => router.push(`/products/${equipment.equipmentId}`)}
                  style={{
                    cursor: 'pointer',
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Image
              src={
                data.image ??
                'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
              }
              alt={data?.name ?? 'image'}
              width={500}
              height={500}
              style={{
                width: '100%',
                height: '100%',
                aspectRatio: '1/1',
                flex: 4,
              }}
            />
          )}
        </Stack>

        <ProductInformation {...data} type="package" />
      </Stack>

      <Stack p={2} spacing={1}>
        <Typography variant="h6" fontWeight={600}>
          Mô tả sản phẩm
        </Typography>
        <Divider />
        <Typography>{data?.description}</Typography>
      </Stack>

      <Stack bgcolor="white" p={2} spacing={2}>
        <Typography variant="h6" fontWeight={600}>
          Đánh giá sản phẩm
        </Typography>

        <Stack gap={2} maxHeight="400px" overflow="auto">
          {reviews &&
            reviews.map((review) => (
              <Stack
                key={review.id}
                direction="row"
                alignItems="center"
                gap={2}
                sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}
              >
                {/* Hiển thị số sao */}
                <Rating value={review.rating} readOnly size="small" />
                <Stack>
                  {/* Bình luận của người dùng */}
                  <p style={{ padding: 0, margin: 0 }}>Tên người đánh giá: {review.user.name}</p>
                  <p style={{ padding: 0, margin: 0 }}>
                    Nội dung: <strong>{review.comment}</strong>
                  </p>
                  <span style={{ fontSize: '0.875rem', color: '#666' }}>
                    Ngày: {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                  </span>

                  {/* Phản hồi từ admin (nếu có) */}
                  {review.adminResponse && (
                    <Stack
                      sx={{
                        mt: 1,
                        p: 1,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        backgroundColor: '#f9f9f9',
                        width: '100%',
                      }}
                    >
                      <strong>Phản hồi từ admin:</strong>
                      <span style={{ fontSize: '0.875rem', color: '#333' }}>{review.adminResponse}</span>
                      <span style={{ fontSize: '0.75rem', color: '#666' }}>
                        Ngày phản hồi: {review.replyDate ? new Date(review.replyDate).toLocaleDateString('vi-VN') : '-'}
                      </span>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            ))}
        </Stack>
      </Stack>

      <FAQComponent />

      <NewRelease />
    </Stack>
  )
}
