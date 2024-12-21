import { getListDevices } from '@/libs/api/devices'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { DeviceSearchInputType, DeviceType } from '../type'

export const useDeviceListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<DeviceType, DeviceSearchInputType>()
  const { page, limit, filter } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['devices-list', page, filter, limit, sort_by, column],
    queryFn: () => getListDevices({ ...input, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.total || 0,
  }
}
