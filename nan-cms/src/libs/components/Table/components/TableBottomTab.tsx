import { deleteAdmins } from '@/libs/api/admin'
import { SIDE_BAR_WIDTH } from '@/libs/components/Layout/Sidebar'
import { Modal } from '@/libs/components/Modal'
import { Paper, Stack } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { ModalDelete } from '../../Modal/ModalDelete'
import { useReactTableContext } from '../ReactTable/context'
import { usePaginationHandler } from '../ReactTable/hooks'
import { ButtonActionTable, ButtonGreen as ButtonConfirm } from '../styled'

type SelectionStateType = {
  id: string
  name: string
}

export const defaultActionApi = {
  admins: {
    delete: deleteAdmins,
    title: '管理者削除',
  },
  users: {
    delete: () => {},
    title: '',
  },
  'damage-reports': {
    delete: () => {},
    title: '',
  },
  'usage-records': {
    delete: () => {},
    title: '',
  },
  books: {
    delete: () => {},
    title: '',
  },
  chapters: {
    delete: () => {},
    title: '',
  },
  episodes: {
    delete: () => {},
    title: '',
  },
  categories: {
    delete: () => {},
    title: '',
  },
  equipments: {
    delete: () => {},
    title: '',
  },
  package: {
    delete: () => {},
    title: '',
  },
  rentals: {
    delete: () => {},
    title: '',
  },
  policies: {
    delete: () => {},
    title: '',
  },
  maintenances: {
    delete: () => {},
    title: '',
  },
  discounts: {
    delete: () => {},
    title: '',
  },
  'repair-records': {
    delete: () => {},
    title: '',
  },
}

export type ActionPath = keyof typeof defaultActionApi
export const TABLE_BOTTOM_TAB_HEIGHT = 120

function TableBottomTab() {
  const pathname = usePathname()
  const { instance, onCopy } = useReactTableContext()
  const rowSelection = instance.getSelectedRowModel().flatRows
  const [selectedIds, setSelectedIds] = useState<SelectionStateType[]>([])
  const path = (pathname.split('/')[1] ? pathname.split('/')[1] : '/') as ActionPath
  const queryClient = useQueryClient()
  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: defaultActionApi[path]?.delete as (ids: string[]) => Promise<void>,
  })
  const { setPageIndex, handleChangePagination } = usePaginationHandler()

  useEffect(() => {
    setSelectedIds(
      rowSelection.map((row) => {
        const original = (row.original as { name: string }).name

        return {
          id: row.id,
          name: original,
        }
      }),
    )
  }, [rowSelection])

  const isShowBottomTab = selectedIds.length > 0
  const [openModal, setOpenModal] = useState(false)
  const [openModalDeleteSuccess, setOpenModalDeleteSuccess] = useState<boolean>(false)

  const handleCloseModal = useCallback(() => {
    instance.resetRowSelection()
    setOpenModal(false)
    setSelectedIds([])
  }, [instance])

  const handleOpenModal = () => setOpenModal(true)

  const handleSubmit = () => {
    handleDelete(
      rowSelection.map((item) => item.id),
      {
        onSuccess: () => {
          queryClient.invalidateQueries()
          handleCloseModal()
          setOpenModalDeleteSuccess(true)
        },
        onError: () => {
          queryClient.invalidateQueries()
          handleCloseModal()
        },
      },
    )
  }

  const handleCloseModalDeleteSuccess = () => {
    setPageIndex(1)
    typeof handleChangePagination === 'function' &&
      handleChangePagination({
        page: 1,
      })

    setOpenModalDeleteSuccess(false)
  }

  const hasCopyFunction = typeof onCopy === 'function'
  const firstSelectedId = selectedIds[0]?.id
  const disabledCopy = selectedIds.length > 1

  return (
    <>
      {isShowBottomTab && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: SIDE_BAR_WIDTH,
            right: 0,
            borderRadius: 0,
            height: TABLE_BOTTOM_TAB_HEIGHT,
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
            <ButtonActionTable variant="outlined" onClick={handleCloseModal}>
              Hủy bỏ
            </ButtonActionTable>

            {hasCopyFunction && (
              <ButtonActionTable
                variant="outlined"
                onClick={() => onCopy(firstSelectedId)}
                disabled={disabledCopy}
              >
                複製
              </ButtonActionTable>
            )}

            <ButtonConfirm
              variant="outlined"
              onClick={handleOpenModal}
              sx={{ height: 48, width: 120, fontSize: '16px' }}
            >
              削除
            </ButtonConfirm>
          </Stack>
        </Paper>
      )}

      <Modal
        open={openModal}
        textSubmit="削除する"
        title={defaultActionApi[path]?.title}
        description={`${selectedIds.map((item) => item.name).join('、 ')}を削除してよろしいですか？`}
        isLoading={isPending}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />

      <ModalDelete
        open={openModalDeleteSuccess}
        title="データの削除が完了しました。"
        handleCloseModal={handleCloseModalDeleteSuccess}
      />
    </>
  )
}

export { TableBottomTab }
