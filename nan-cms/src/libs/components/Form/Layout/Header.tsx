'use client'

import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import CopyIcon from 'public/assets/svgs/copy.svg'
import { BreadcrumbType, Breadcrumbs } from '../../BreadCrumbs'
import { ButtonUpTop } from '../../Table/styled'
import { ButtonAction, ButtonDelete } from './styled'

interface HeaderProps {
  title: string
  editPath?: string
  copyPath?: string
  deleteFunction?: () => void
  isPending?: boolean
  pathArrCustom?: BreadcrumbType[]
  hiddenBreadcrumb?: boolean
  showButtonUpTop?: boolean
  updateTopFunction?: () => void
  titleTop?: string
}

const Header = (props: HeaderProps) => {
  const router = useRouter()
  const {
    title,
    editPath,
    deleteFunction,
    isPending,
    pathArrCustom,
    hiddenBreadcrumb,
    copyPath,
    showButtonUpTop,
    updateTopFunction,
    titleTop,
  } = props

  if (hiddenBreadcrumb)
    return (
      <Typography variant="h2" color="grey.600">
        {title}
      </Typography>
    )

  return (
    <Stack spacing={3}>
      <Typography variant="h2" color="grey.600">
        {title}
      </Typography>

      <Stack direction="row" justifyContent="space-between">
        <Breadcrumbs pathArrCustom={pathArrCustom} />

        <Stack direction="row" spacing={1}>
          {copyPath && (
            <ButtonAction
              variant="outlined"
              startIcon={<CopyIcon />}
              onClick={() => router.push(copyPath)}
              disabled={isPending}
            >
              複製
            </ButtonAction>
          )}
          {showButtonUpTop && (
            <ButtonUpTop variant="contained" onClick={updateTopFunction}>
              {titleTop}
            </ButtonUpTop>
          )}

          {editPath && (
            <ButtonAction
              variant="outlined"
              onClick={() => router.push(editPath)}
              disabled={isPending}
            >
              Chỉnh sửa
            </ButtonAction>
          )}

          {deleteFunction && (
            <ButtonDelete variant="outlined" onClick={deleteFunction} disabled={isPending}>
              Xóa
            </ButtonDelete>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export { Header }
