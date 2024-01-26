import SelectCell from '@/components/data-tables/SelectCell'
import SelectHeader from '@/components/data-tables/SelectHeader'
import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { GoodsReceipt } from '@/types/entities/GoodsReceipt'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<GoodsReceipt>[] = [
  {
    id: 'select',
    header: ({ table }) => <SelectHeader table={table} />,
    cell: ({ row }) => <SelectCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'Название',
    accessorKey: 'name',
    header: () => (
      <SortableDataTableHeader
        label='Название'
        orderByProperty='name'
        routeId='/layout/goods-receipts'
      />
    ),
  },
  {
    id: 'Дата прихода',
    accessorKey: 'goodsReceiptDate',
    header: () => (
      <SortableDataTableHeader
        label='Дата прихода'
        orderByProperty='goodsReceiptDate'
        routeId='/layout/goods-receipts'
      />
    ),
  },
]
