'use client'

import { base } from '@/libs/configs'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/system'
import Link from 'next/link'
import * as React from 'react'
import { Swipper } from './SwiperProduct'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'base.white',
  boxShadow: 24,
  p: 4,
}

interface PreviewModalProps {
  open: boolean
  handleClose: () => void
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  handleClose,
  open,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction="row" width="100%" gap={1}>
          <Swipper />
          <Stack width="50%">
            <Stack>
              <Typography fontSize={16} fontWeight={600}>
                Áo Dài Tố Sa XÉO XỌ
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Mã sản phẩm: xeoxo35
              </Typography>
            </Stack>

            <Stack direction="row" gap={2}>
              <Typography>Giá: </Typography>
              <Typography fontWeight={700}> 990,000₫</Typography>
            </Stack>

            <Button
              variant="contained"
              sx={{ backgroundColor: base.primary, color: base.white }}
            >
              Thêm vào giỏ hàng
            </Button>

            <Link href="/products/1">Xem chi tiết</Link>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}
