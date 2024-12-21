import { Box, Typography } from '@mui/material'
import 'swiper/css'

const RecommendedProducts = ({ products }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Có thể bạn sẽ thích
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {products &&
          products.map((product, index) => (
            <Box
              key={index}
              sx={{
                width: '23%', // Adjust percentage to control the number of items per row
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 1,
                p: 1,
                backgroundColor: '#fff',
                position: 'relative',
                textAlign: 'center',
                mb: 2,
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{ width: '100%', height: 180, objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  backgroundColor: 'red',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: 1,
                  fontSize: '12px',
                }}
              >
                -{product.discount}%
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
                {product.name}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {product.priceDay}đ
              </Typography>
              {/* <Typography
              variant="body2"
              sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
            >
              {product.oldPrice}đ
            </Typography> */}
            </Box>
          ))}
      </Box>
    </Box>
  )
}

export default RecommendedProducts
