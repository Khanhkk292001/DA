import { useGetMe } from '@/libs/hooks'
import { setAccessTokenToStorage } from '@/utils/localStorage'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { IconButton, Popover, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'

export const Account = () => {
  const { data } = useGetMe()
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const menu = [
    {
      name: 'Thông tin cá nhân',
      onClick: () => {
        router.push('/profile')
      },
    },
    {
      name: 'Thông tin căn cước',
      onClick: () => {
        router.push('/identity-card')
      },
    },
    {
      name: 'Lịch sử thuê',
      onClick: () => {
        router.push('/history-rental')
      },
    },
    {
      name: 'Đăng xuất',
      onClick: async () => {
        await setAccessTokenToStorage('')
        window.location.href = '/'
      },
    },
  ]

  return (
    <Fragment>
      <IconButton onClick={handleClick}>
        <AccountCircleIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {data && data.id ? (
          <>
            {menu.map((item, index) => (
              <Stack key={index} spacing={2} sx={{ padding: 2, width: 200, cursor: 'pointer' }} onClick={item.onClick}>
                <Typography>{item.name}</Typography>
              </Stack>
            ))}
          </>
        ) : (
          <Stack
            spacing={2}
            sx={{ padding: 2, width: 200, cursor: 'pointer' }}
            onClick={() => {
              router.push('/auth')
            }}
          >
            <Typography>Đăng nhập</Typography>
          </Stack>
        )}
      </Popover>
    </Fragment>
  )
}

// pending | confirmed | canceled | completed
