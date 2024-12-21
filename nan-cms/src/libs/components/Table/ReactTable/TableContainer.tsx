import { Box, TableContainer as MuiTableContainer } from '@mui/material'
import { PropsWithChildren } from 'react'

const TableContainer: React.FC<
  PropsWithChildren<{
    freeContainerHeight?: boolean
  }>
> = ({ children }) => {
  return (
    <MuiTableContainer>
      <Box width="100%">{children}</Box>
    </MuiTableContainer>
  )
}

export { TableContainer }
