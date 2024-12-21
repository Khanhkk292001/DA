'use client'

import { getMe } from '@/service/auth.service'
import { getCarts } from '@/service/cart.service'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Badge, IconButton, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Account } from './Account'
import { menu } from './menu'
import { Notification } from './Notification'
import { Search } from './Search'

export const HEADER_HEIGHT = 120

export const Header = () => {
  const router = useRouter()

  useQuery({
    queryKey: ['ME'],
    queryFn: getMe,
  })

  const { data } = useQuery({
    queryKey: ['Carts'],
    queryFn: getCarts,
  })

  return (
    <Stack
      left={0}
      right={0}
      top={0}
      height={HEADER_HEIGHT}
      position="fixed"
      sx={{ backgroundColor: 'white' }}
      zIndex={1000}
    >
      {/* Topbar Section */}
      <Stack
        direction="row"
        justifyContent="space-between"
        height={70}
        alignItems="center"
        px={{ xs: 2, md: 10 }} // Responsive padding
        sx={{ backgroundColor: '#9df3e4' }}
      >
        <Typography fontSize={{ xs: 12, md: 14 }} fontWeight={400}>
    
        </Typography>
        <Stack alignItems="center" flexDirection="row" gap={1}>
          <Notification />
          <Typography fontSize={{ xs: 12, md: 14 }}>Thông báo cho tôi</Typography>
        </Stack>
      </Stack>

      {/* Main Header Section */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={{ xs: 2, md: 10 }}
        py={2}
        height={{ xs: 60, md: 80 }} // Height changes for mobile
      >
        {/* Logo */}
        <Typography
          variant="h1"
          component={Link}
          href="/"
          sx={{
            textDecoration: 'none',
            fontSize: { xs: 24, md: 32 }, // Responsive font size
            color: 'base.black',
          }}
        >
          Thiết bị
        </Typography>

        {/* Menu */}
        <Stack
          direction="row"
          justifyContent="center"
          gap={2}
          alignItems="center"
          display={{ xs: 'none', md: 'flex' }} // Hide menu on small screens
        >
          {menu.map((item, index) => (
            <Typography
              fontSize={{ xs: 14, md: 16 }}
              fontWeight={600}
              key={index}
              component={Link}
              sx={{ textDecoration: 'none', color: 'base.black' }}
              href={item.href}
            >
              {item.title}
            </Typography>
          ))}
        </Stack>

        {/* Actions */}
        <Stack direction="row" justifyContent="space-between" gap={2} alignItems="center">
          <Search />

          <Account />

          <IconButton
            sx={{
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={() => router.push('/cart')}
          >
            <Badge badgeContent={data?.items?.length ?? 0} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Stack>
      </Stack>

      {/* Mobile Menu */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          display: { xs: 'flex', md: 'none' }, // Show on small screens only
          backgroundColor: '#f5f5f5',
          paddingY: 1,
          gap: 2,
        }}
      >
        {menu.map((item, index) => (
          <Typography
            fontSize={14}
            fontWeight={500}
            key={index}
            component={Link}
            sx={{ textDecoration: 'none', color: 'base.black' }}
            href={item.href}
          >
            {item.title}
          </Typography>
        ))}
      </Stack>
    </Stack>
  )
}
