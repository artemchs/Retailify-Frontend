import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { Warehouse } from '@/types/entities/Warehouse'
import { ColumnDef } from '@tanstack/react-table'
import WarehouseActions from './WarehouseActions'

export const columns: ColumnDef<Warehouse>[] = [
  {
    id: 'Название',
    accessorKey: 'name',
    header: () => (
      <SortableDataTableHeader
        label='Название'
        orderByProperty='name'
        routeId='/layout/warehouses'
      />
    ),
    cell: ({ row }) => <span className='font-medium'>{row.original.name}</span>,
  },
  {
    id: 'Адрес',
    accessorKey: 'address',
    header: () => (
      <SortableDataTableHeader
        label='Адрес'
        orderByProperty='address'
        routeId='/layout/warehouses'
      />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, isArchived } = row.original

      return <WarehouseActions id={id} isArchived={isArchived} />
    },
    enableSorting: false,
    enableHiding: false,
  },
]
