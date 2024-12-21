'use client'

import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '@/libs/api/notifications'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {
  Badge,
  CircularProgress,
  Divider,
  IconButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import React, { useState } from 'react'

export function Notification() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['NOTIFICATION'],
    queryFn: getNotifications,
    staleTime: 1000 * 60 * 5, // 5 phút
  })

  // Mutation cho từng thông báo
  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['NOTIFICATION'],
      })
    },
  })

  // Mutation đánh dấu tất cả đã đọc
  const markAllAsReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['NOTIFICATION'],
      })
    },
  })

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMarkAsRead = async (id: string) => {
    await markAsReadMutation.mutateAsync(id)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'notification-popover' : undefined

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 20 }}>
      <IconButton onClick={handleClick}>
        <Badge
          badgeContent={data?.filter((item) => item.status === 'unread').length ?? 0}
          color="error"
          invisible={!data?.length}
        >
          <NotificationsIcon />
        </Badge>
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
        PaperProps={{
          sx: {
            width: 400,
            maxHeight: 400,
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" p={2}>
          <Typography fontWeight={700}>Thông báo</Typography>
          {/* <Typography color="primary" sx={{ cursor: 'pointer' }} onClick={handleMarkAllAsRead}>
            Đánh dấu tất cả đã đọc
          </Typography> */}
        </Stack>

        <Divider />

        {isLoading ? (
          <Stack alignItems="center" justifyContent="center" height={200}>
            <CircularProgress />
          </Stack>
        ) : !data?.length ? (
          <Stack alignItems="center" justifyContent="center" height={200}>
            <Typography>Không có thông báo</Typography>
          </Stack>
        ) : (
          <Stack spacing={1} p={1}>
            {data.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                p={2}
                sx={{
                  cursor: item.status === 'unread' ? 'pointer' : 'default',
                }}
                bgcolor={item.status === 'unread' ? '#EEEEEE' : 'transparent'}
                onClick={() => {
                  if (item.status === 'unread') {
                    handleMarkAsRead(item.id)
                  }
                }}
              >
                <Stack>
                  <Typography fontWeight={700}>{item.message}</Typography>
                  <Typography fontSize={12}>
                    {format(new Date(item.createdAt), 'dd/MM/yyyy')}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </Popover>
    </div>
  )
}
