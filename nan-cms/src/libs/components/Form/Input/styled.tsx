import { Button, styled } from '@mui/material'

const ButtonActionPassword = styled(Button)(({ theme }) => ({
  width: 24,
  height: 24,
  marginRight: 10,
  padding: 0,
  minWidth: 0,
  ':hover': {
    backgroundColor: theme.palette.base.white,
  },
}))

export { ButtonActionPassword }
