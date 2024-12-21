import { RowData } from '@tanstack/table-core'
import { createContext, useContext } from 'react'
import { ReactTableContextValue } from './types'

export const ReactTableContext = createContext<ReactTableContextValue<RowData>>(
  {} as ReactTableContextValue<RowData>,
)

export const ReactTableProvider = ReactTableContext.Provider

export const useReactTableContext = () => {
  const value = useContext(ReactTableContext)
  return value
}
