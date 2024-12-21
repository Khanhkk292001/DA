import { Button, styled } from '@mui/material'

export const OutlineButton = styled(Button)(({ theme }) => ({
  fontWeight: 400,
  color: theme.palette.base.black,
  borderColor: theme.palette.base.black,
  border: '1px solid',
  borderRadius: 2,
  '&:hover': {
    color: theme.palette.base.black,
  },
}))
