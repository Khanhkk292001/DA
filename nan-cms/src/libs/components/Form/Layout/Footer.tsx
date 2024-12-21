'use client'

import { Button, Paper, Stack } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ButtonSaveForm } from '../../Button'
import { SIDE_BAR_WIDTH } from '../../Layout/Sidebar'
import { Modal } from '../../Modal'

type FooterFormProps = {
  isPending?: boolean
  isDirty?: boolean
  closeFormPath?: string
}
export const FORM_LAYOUT_FOOTER_HEIGHT = 120

const Footer = ({ isPending, isDirty, closeFormPath }: FooterFormProps) => {
  const pathName = usePathname()
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const handleCloseModal = () => setOpenModal(false)
  const handleOpenModal = () => {
    if (isDirty) {
      setOpenModal(true)
      return
    }

    handleCloseForm()
  }

  const handleCloseForm = () => {
    if (closeFormPath) {
      router.push(closeFormPath)
      return
    }

    if (pathName.includes('/real-estate')) {
      router.push('/')
      return
    }

    if (pathName.includes('/edit') && !pathName.includes('/self-info')) {
      const path = pathName.split('/').slice(0, -2).join('/')

      router.push(path)
      return
    }

    const path = pathName.split('/').slice(0, -1).join('/')
    router.push(path)
  }

  return (
    <>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: SIDE_BAR_WIDTH,
          right: 0,
          borderRadius: 0,
          height: FORM_LAYOUT_FOOTER_HEIGHT,
        }}
        elevation={3}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          height="100%"
          gap={2}
        >
          <Button
            variant="outlined"
            onClick={handleOpenModal}
            disabled={isPending}
            sx={{ width: 120, padding: 0, fontSize: 16 }}
          >
            Hủy bỏ
          </Button>

          <ButtonSaveForm
            variant="contained"
            type="submit"
            sx={{ width: 120, fontSize: 16 }}
            disabled={isPending}
          >
            Lưu
          </ButtonSaveForm>
        </Stack>
      </Paper>

      <Modal
        open={openModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleCloseForm}
        textSubmit="Đóng mà không lưu"
        title="Không có dữ liệu nào được lưu"
        description="Tất cả dữ liệu được nhập sẽ bị loại bỏ. Bạn có chắc chắn không?"
        textCancel="Quay lại"
      />
    </>
  )
}

export { Footer }
