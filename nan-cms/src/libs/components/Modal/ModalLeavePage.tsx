import { useRouteChangeEvents } from 'nextjs-router-events'
import { useCallback, useEffect, useState } from 'react'
import { Modal } from '../Modal'

type ModalLeavePageProps = {
  isDirty: boolean
}

const ModalLeavePage = ({ isDirty }: ModalLeavePageProps) => {
  const [showModalConfirmLeavePage, setShowModalConfirmLeavePage] = useState(false)
  const [actionBackPage, setActionBackPage] = useState(false)

  const onBeforeRouteChange = useCallback(() => {
    window.onload = () => {
      window.history.pushState(null, '', window.location.href)
    }

    if (isDirty) {
      setShowModalConfirmLeavePage(true)
      return false
    }

    return true
  }, [isDirty])

  useEffect(() => {
    if (history.pushState && isDirty) {
      history.pushState(null, document.title, location.href)

      const handlePopstate = (event: Event) => {
        event.preventDefault()
        setShowModalConfirmLeavePage(true)
        setActionBackPage(true)
      }

      window.addEventListener('popstate', handlePopstate)
      window.history.pushState({ modalOpened: false }, '')

      return () => {
        window.removeEventListener('popstate', handlePopstate)
      }
    }
  }, [isDirty])

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange })

  const handleConfirmLeavePage = () => {
    if (actionBackPage) {
      history.go(-2)
      setShowModalConfirmLeavePage(false)
      return
    }

    allowRouteChange()
  }

  const handleCloseModalLeavePage = () => {
    if (actionBackPage) {
      setActionBackPage(false)
      setShowModalConfirmLeavePage(false)
      history.pushState(null, document.title, location.href)

      return
    }

    setShowModalConfirmLeavePage(false)
  }

  return (
    <Modal
      open={showModalConfirmLeavePage}
      handleCloseModal={handleCloseModalLeavePage}
      handleSubmit={handleConfirmLeavePage}
      textSubmit="Đóng mà không lưu"
      title="Không có dữ liệu nào được lưu"
      description="Tất cả dữ liệu được nhập sẽ bị loại bỏ. Bạn có chắc chắn không?"
      textCancel="Quay lại"
    />
  )
}

export { ModalLeavePage }
