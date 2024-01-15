import SelectCell from '@/components/data-tables/SelectCell'
import SelectHeader from '@/components/data-tables/SelectHeader'
import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { Warehouse } from '@/types/entities/Warehouse'
import { ColumnDef } from '@tanstack/react-table'
import WarehouseActions from './WarehouseActions'

export const columns: ColumnDef<Warehouse>[] = [
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
        routeId='/layout/warehouses'
      />
    ),
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
