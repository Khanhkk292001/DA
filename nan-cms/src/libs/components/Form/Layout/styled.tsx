import { Button, styled } from '@mui/material'

const ButtonAction = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.base.primary,
  color: theme.palette.base.primary,
  '&:hover': {
    borderColor: theme.palette.base.primary,
  },
  '&:focus': {
    borderColor: theme.palette.base.primary,
  },
  height: 40,
  width: 140,
  padding: '6px 16px',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 'normal',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const ButtonDelete = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.base.primary_red,
  color: theme.palette.base.primary_red,
  '&:hover': {
    borderColor: theme.palette.base.primary_red,
  },
  '&:focus': {
    borderColor: theme.palette.base.primary_red,
  },
  height: 40,
  width: 140,
  padding: '6px 16px',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 'normal',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export { ButtonAction, ButtonDelete }
