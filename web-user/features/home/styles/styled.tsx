import { Stack, styled } from '@mui/material'

export const CategoryCard = styled(Stack)(({ theme }) => ({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  gap: theme.spacing(1),
}))
