import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { DateFormatter } from '@/components/ui/units'
import { InventoryTransfer } from '@/types/entities/InventoryTransfer'
import { ColumnDef } from '@tanstack/react-table'
import InventoryTransferActions from './InventoryTransferActions'

export const columns: ColumnDef<InventoryTransfer>[] = [
  {
    id: 'Название',
    header: () => (
      <SortableDataTableHeader
        label='Название'
        orderByProperty='name'
        routeId='/layout/inventory-transfers'
      />
    ),
    cell: ({ row }) => {
      return <span className='font-medium'>{row.original.name}</span>
    },
  },
  {
    id: 'Дата',
    accessorKey: 'date',
    header: () => (
      <SortableDataTableHeader
        label='Дата'
        orderByProperty='date'
        routeId='/layout/inventory-transfers'
      />
    ),
    cell: ({ row }) => <DateFormatter date={row.original.date} />,
  },
  {
    id: 'Причина',
    header: 'Причина',
    accessorFn: ({ reason }) => reason?.name,
  },
  {
    id: 'Со склада',
    header: 'Со склада',
    accessorFn: ({ sourceWarehouse }) => sourceWarehouse?.name,
  },
  {
    id: 'На склад',
    header: 'На склад',
    accessorFn: ({ destinationWarehouse }) => destinationWarehouse?.name,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, isArchived } = row.original

      return <InventoryTransferActions id={id} isArchived={isArchived} />
    },
    enableSorting: false,
    enableHiding: false,
  },
]
