import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { Collection } from '@/types/entities/Collection'
import { ColumnDef } from '@tanstack/react-table'
import CollectionActions from './CollectionActions'

export const columns: ColumnDef<Collection>[] = [
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
    cell: ({ row }) => {
      const { name } = row.original

      return <span className='font-medium'>{name}</span>
    },
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

      return <CollectionActions id={id} isArchived={isArchived} />
    },
    enableSorting: false,
    enableHiding: false,
  },
]
