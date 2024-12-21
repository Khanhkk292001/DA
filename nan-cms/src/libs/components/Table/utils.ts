import { TableSide } from './ReactTable/types'

export const getTableSide = (side?: TableSide) => {
  switch (side) {
    case 'left':
      return {
        cellKey: 'getLeftVisibleCells',
        headerGroupKey: 'getLeftHeaderGroups',
      }
    case 'right':
      return {
        cellKey: 'getRightVisibleCells',
        headerGroupKey: 'getRightHeaderGroups',
      }
    case 'center':
      return {
        cellKey: 'getCenterVisibleCells',
        headerGroupKey: 'getCenterHeaderGroups',
      }
    default:
      return {
        cellKey: 'getVisibleCells',
        headerGroupKey: 'getHeaderGroups',
      }
  }
}
