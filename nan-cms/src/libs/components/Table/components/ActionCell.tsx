import { base } from '@/libs/config/theme'
import InfoIcon from '@mui/icons-material/Info'
import { IconButton, Stack } from '@mui/material'
import { RowData } from '@tanstack/react-table'
import { usePathname, useRouter } from 'next/navigation'
import { ActionConfig, ReactTableCellProps } from '../ReactTable/types'
import { ButtonAction } from '../styled'

function ActionCell<T extends RowData, TValue = unknown>({
  row,
  table,
}: ReactTableCellProps<T, TValue>): JSX.Element {
  const router = useRouter()
  const meta = table.options.meta
  const pathname = usePathname()
  const actionConfig = meta?.action as ActionConfig<T>
  const id = (row.original as { id: never }).id

  const detailConfig = actionConfig.onDetail
  const hasDetailConfig = detailConfig && typeof detailConfig === 'function'
  const hasDetail = !actionConfig.disabledDetail

  const onDetail = () => {
    if (hasDetailConfig) {
      detailConfig(id as string, row)
    } else {
      router.push(`${pathname}/${id}/detail`)
    }
  }

  return (
    <Stack direction="row" justifyContent="center">
      {actionConfig.renderLeft && actionConfig.renderLeft(row)}

      {hasDetail && (
        <ButtonAction onClick={onDetail}>
          {actionConfig.detailIcon || (
            <IconButton>
              <InfoIcon style={{ fill: base.primary }} fontSize="small" />
            </IconButton>
          )}
        </ButtonAction>
      )}

      {actionConfig.renderRight && actionConfig.renderRight(row)}
    </Stack>
  )
}

export { ActionCell }
