import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { Collection } from '@/types/entities/Collection'
import { ColumnDef } from '@tanstack/react-table'
import CollectionActions from './CollectionActions'
import RowNameCell from './RowNameCell'

export const columns: ColumnDef<Collection>[] = [
  {
    id: 'Название',
    header: () => (
      <SortableDataTableHeader
        label='Название'
        orderByProperty='name'
        routeId='/layout/collections'
      />
    ),
    cell: ({ row }) => <RowNameCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'Количетсво моделей',
    header: () => 'Количетсво моделей',
    cell: ({ row }) => {
      return <span>{row.original._count?.products ?? 0}</span>
    },
  },
  {
    id: 'Количетсво характеристик',
    header: () => 'Количетсво характеристик',
    cell: ({ row }) => {
      return <span>{row.original._count?.characteristics ?? 0}</span>
    },
  },
  {
    id: 'Количетсво субколлекций',
    header: () => 'Количетсво субколлекций',
    cell: ({ row }) => {
      return <span>{row.original._count?.children ?? 0}</span>
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
