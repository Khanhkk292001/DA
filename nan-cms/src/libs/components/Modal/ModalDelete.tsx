import { base } from '@/libs/config/theme'
import { Box, Button, Modal as MuiModal, Stack, Typography, styled } from '@mui/material'
import React from 'react'

type ModalDeleteProps = {
  open: boolean
  handleCloseModal: () => void
  title: string
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  open,
  handleCloseModal,
  title,
}: ModalDeleteProps) => {
  return (
    <MuiModal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
      sx={{
        backgroundColor: base.bg_dark,
      }}
    >
      <BoxContainer>
        <Stack alignItems="center" spacing={5}>
          <Typography variant="h3" color="mono.500">
            {title}
          </Typography>

          <Button variant="outlined" sx={{ width: 240 }} onClick={handleCloseModal}>
            閉じる
          </Button>
        </Stack>
      </BoxContainer>
    </MuiModal>
  )
}

export { ModalDelete }

const BoxContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  minHeight: 178,
  boxShadow: theme.shadows[1],
  borderRadius: 16,
  padding: '48px 16px 24px 16px',
  background: theme.palette.base.white,
}))
