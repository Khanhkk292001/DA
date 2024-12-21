import { EquipmentType } from '@/features'
import request from '@/libs/configs/axios/axios'
import { formatMoney } from '@/utils'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Divider, IconButton, InputBase, List, Popover, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'

export type SearchResult = EquipmentType & {
  type?: 'equipment' | 'package'
}

export const Search = () => {
  const [keyword, setKeyword] = React.useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['search', keyword],
    queryFn: async (): Promise<{ data: SearchResult[]; total: number }> => {
      const response = await request.get(`/equipments/search?keyword=${keyword}`)
      return response.data
    },
    enabled: !!keyword,
  })

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

  return (
    <Fragment>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={handleClick}>
          <SearchIcon />
        </IconButton>
      </Box>

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
          style: { width: '350px', padding: '10px' },
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Tìm kiếm
        </Typography>

        <InputBase
          placeholder="Tìm kiếm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            flex: 1,
            width: '100%',
          }}
        />

        <Box minHeight={3}>
          {isLoading ? (
            <Typography textAlign="center">Loading...</Typography>
          ) : (
            <>
              {data && data.data.length > 0 ? (
                <List>
                  {data.data.slice(0, 5).map((item) => (
                    <Fragment key={item.id}>
                      <div
                        style={{ display: 'flex', alignItems: 'center', padding: '10px 0', cursor: 'pointer' }}
                        onClick={() => {
                          if (item.type === 'equipment') {
                            router.push(`/products/${item.id}`)
                          }
                          if (item.type === 'package') {
                            router.push(`/packages/${item.id}`)
                          }
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '10px' }}
                        />
                        <div>
                          <p style={{ margin: 0, fontWeight: 'bold' }}>{item.name}</p>
                          <p style={{ margin: 0, color: 'gray' }}>{formatMoney(item.rentalPrice)}</p>
                        </div>
                      </div>
                      <Divider />
                    </Fragment>
                  ))}
                  <Box textAlign="center" marginTop="10px">
                    <Button variant="text" onClick={() => router.push(`/search?keyword=${keyword}`)}>
                      Xem thêm {data.data.length} sản phẩm
                    </Button>
                  </Box>
                </List>
              ) : (
                keyword && (
                  <Typography variant="body2" align="center" color="textSecondary">
                    Không có kết quả phù hợp
                  </Typography>
                )
              )}
            </>
          )}
        </Box>
      </Popover>
    </Fragment>
  )
}
