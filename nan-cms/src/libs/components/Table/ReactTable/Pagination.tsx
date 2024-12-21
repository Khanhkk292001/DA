import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Pagination, Stack } from '@mui/material'
import { SIDE_BAR_WIDTH } from '../../Layout/Sidebar'
import { ButtonPagination, PaginationItem } from '../styled'
import { PerPageSelect } from './PerPageSelection'
import { useReactTableContext } from './context'
import { usePaginationHandler } from './hooks'

export const PAGINATION_HEIGHT = 66

const TablePagination = () => {
  const { pageCount, pageIndex, setPageIndex, handleChangePagination, pageSize } =
    usePaginationHandler()
  const { instance, hiddenPagination, next } = useReactTableContext()
  const isShowPagination = !hiddenPagination || instance.getSelectedRowModel().flatRows.length !== 0

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      position="fixed"
      bottom={0}
      left={SIDE_BAR_WIDTH}
      right={40}
      height={PAGINATION_HEIGHT}
      bgcolor="base.bg_secondary"
    >
      <Box flex={1}></Box>

      <Stack flex={1} alignItems="center" justifyContent="center">
        <Pagination
          page={pageIndex + 1}
          count={Math.ceil(next / pageSize)}
          onChange={(_, page) => {
            setPageIndex(page - 1)
            typeof handleChangePagination === 'function' &&
              handleChangePagination({
                page,
              })
          }}
          renderItem={(item) => (
            <PaginationItem
              components={{
                next: (props) => (
                  <ButtonPagination
                    onClick={() => {
                      typeof handleChangePagination === 'function' &&
                        handleChangePagination({
                          page: pageIndex + 1,
                        })
                    }}
                  >
                    {...props}
                  </ButtonPagination>
                ),
                previous: (props) => (
                  <ButtonPagination
                    onClick={() => {
                      typeof handleChangePagination === 'function' &&
                        handleChangePagination({
                          page: pageIndex - 1,
                        })
                    }}
                  >
                    {...props}
                  </ButtonPagination>
                ),
              }}
              slots={{
                previous: KeyboardArrowLeftIcon,
                next: KeyboardArrowRightIcon,
              }}
              {...item}
            />
          )}
        />
      </Stack>

      <PerPageSelect />
    </Stack>
  )
}

export { TablePagination }
