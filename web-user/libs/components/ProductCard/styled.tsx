import { Stack, styled } from '@mui/material'

const ProductCardContainer = styled(Stack)(({ theme }) => ({
  cursor: 'pointer',
  padding: theme.spacing(1),
  gap: theme.spacing(6),
  transistion: 'all 0.8s',
  '&:hover': {
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.base.white,
    transistion: 'all 0.8s',
  },
}))

export { ProductCardContainer }
