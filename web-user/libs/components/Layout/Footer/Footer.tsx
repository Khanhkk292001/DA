import { Box, Grid, Link, Typography } from '@mui/material'

export const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#9df3e4',
        padding: '40px',
      }}
    >
      <Grid container spacing={4} px={{ xs: 2, sm: 4, md: 8 }}>
        {/* Logo and Contact Info */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Thiết bị
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Hà Nội, Việt Nam
          </Typography>
          <Typography variant="body2">Email: Khanhc2k31@shopname.com</Typography>
          <Typography variant="body2">Hotline: 1900 2001</Typography>
        </Grid>

        {/* Product Categories */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Danh mục cho thuê
          </Typography>
          <Box>
            <Link href="/packages" underline="none" color="textSecondary">
              Gói thiết bị
            </Link>
          </Box>
          <Box>
            <Link href="/products" underline="none" color="textSecondary">
              Thiết bị
            </Link>
          </Box>
        </Grid>

        {/* Useful Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Liên kết hữu ích
          </Typography>
          <Box>
            <Link href="/faq" underline="none" color="textSecondary">
              FAQ
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Box
        sx={{
          borderTop: '1px solid white',
          marginTop: 4,
          paddingTop: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © 2025 ShopThueDo
        </Typography>
      </Box>
    </Box>
  )
}
