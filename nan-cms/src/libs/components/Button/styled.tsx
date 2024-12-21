import { Button, styled } from '@mui/material'

const ButtonSaveForm = styled(Button)(({ theme }) => ({
  width: 120,
  fontSize: 16,
  backgroundColor: theme.palette.base.black,
  '&:hover': {
    backgroundColor: theme.palette.base.black,
  },
  '&:focus': {
    backgroundColor: theme.palette.base.black,
  },
}))

export { ButtonSaveForm }
