'use client'

import { EquipmentSearchInputType, EquipmentType } from '@/features/equipments'
import { getListEquipmentsByCategory } from '@/libs/api/categories'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export const useEquipmentByCategoryListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    EquipmentType,
    EquipmentSearchInputType
  >()
  const { page, limit, filter } = input
  const { sort_by, column } = sortOptions || {}
  const { categoriesId } = useParams()

  const data = useQuery({
    queryKey: ['equipments-list', page, filter, limit, sort_by, column],
    queryFn: () =>
      getListEquipmentsByCategory(String(categoriesId), { ...input, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
