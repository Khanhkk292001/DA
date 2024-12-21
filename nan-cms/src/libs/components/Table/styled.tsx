import {
  Button,
  IconButton,
  PaginationItem as MuiPaginationItem,
  TableCell as MuiTableCell,
  styled,
} from '@mui/material'

const ButtonPagination = styled(Button)(({ theme }) => ({
  background: theme.palette.base.white + '!important',
  padding: 0,
  borderRadius: 6,
  border: `1px solid ${theme.palette.mono[200]}`,
  backgroundColor: theme.palette.base.white,
}))

const ButtonAction = styled(IconButton)({
  padding: 0,
  '&:hover': {
    background: 'transparent',
  },
})

const PaginationItem = styled(MuiPaginationItem)(({ theme }) => ({
  border: 'none',
  width: 24,
  height: 32,
  padding: '6px 8px',
  minWidth: 24,
  margin: '0 2px',
  borderRadius: '6px',
  '&.Mui-selected': {
    border: 'none',
    backgroundColor: theme.palette.base.primary_pale,
    color: theme.palette.base.primary,
  },
  '&.MuiPaginationItem-previousNext': {
    minWidth: 32,
    border: `1px solid ${theme.palette.mono[200]}`,
    padding: '8px',
    margin: '0 6px',
  },
}))

const ButtonGreen = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  height: 40,
  fontSize: '14px',
  width: 140,
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&:focus': {
    borderColor: theme.palette.primary.main,
  },
}))

const ButtonCreate = styled(Button)(({ theme }) => ({
  background: theme.palette.base.primary,
  borderColor: theme.palette.base.primary,
  color: theme.palette.base.white,
  width: 140,
  height: 40,
  padding: 0,
  fontSize: '14px',
  transition: '0.3s ease-in-out',
  '&:hover': {
    background: theme.palette.base.primary,
    borderColor: theme.palette.base.primary,
    opacity: 0.8,
  },
  '&:focus': {
    background: theme.palette.base.primary,
    borderColor: theme.palette.base.primary,
    opacity: 0.8,
  },
  '&:disabled': {
    background: theme.palette.grey[300],
    borderColor: theme.palette.grey[300],
    color: theme.palette.text.disabled,
    cursor: 'not-allowed',
  },
}))

const TableCell = styled(MuiTableCell)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  textAlign: 'center',
}))

const ButtonSearch = styled(ButtonGreen)({
  marginLeft: 16,
})

const ButtonActionTable = styled(Button)({
  width: 120,
  height: 48,
  padding: 0,
})

const ButtonUpTop = styled(Button)(({ theme }) => ({
  background: theme.palette.base.primary,
  borderColor: theme.palette.base.primary,
  color: theme.palette.base.white,
  width: 140,
  height: 40,
  padding: 0,
  fontSize: '14px',
  transition: '0.3s ease-in-out',
  '&:hover': {
    background: theme.palette.base.primary,
    borderColor: theme.palette.base.primary,
    opacity: 0.8,
  },
  '&:focus': {
    background: theme.palette.base.primary,
    borderColor: theme.palette.base.primary,
    opacity: 0.8,
  },
  '&:disabled': {
    background: theme.palette.grey[300],
    borderColor: theme.palette.grey[300],
    color: theme.palette.text.disabled,
    cursor: 'not-allowed',
  },
}))

export {
  ButtonAction,
  ButtonActionTable,
  ButtonCreate,
  ButtonGreen,
  ButtonPagination,
  ButtonSearch,
  ButtonUpTop,
  PaginationItem,
  TableCell,
}
