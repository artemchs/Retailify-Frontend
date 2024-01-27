import SelectCell from '@/components/data-tables/SelectCell'
import SelectHeader from '@/components/data-tables/SelectHeader'
import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { Collection } from '@/types/entities/Collection'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Collection>[] = [
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
        routeId='/layout/collections'
      />
    ),
  },
  {
    id: 'Количетсво моделей',
    accessorKey: '_count',
    header: () => 'Количетсво моделей',
    cell: ({ row }) => {
      const productsNumber = row.original._count.products

      return <span>{productsNumber}</span>
    },
  },
  {
    id: 'Количетсво характеристик',
    accessorKey: '_count',
    header: () => 'Количетсво характеристик',
    cell: ({ row }) => {
      const productsNumber = row.original._count.characteristics

      return <span>{productsNumber}</span>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, isArchived } = row.original

      return <></>
    },
    enableSorting: false,
    enableHiding: false,
  },
]
