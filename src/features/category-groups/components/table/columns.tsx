import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { CategoryGroup } from '@/types/entities/CategoryGroup'
import { ColumnDef } from '@tanstack/react-table'
import CategoryGroupActions from './CategoryGroupActions'

export const columns: ColumnDef<CategoryGroup>[] = [
  {
    id: 'Название',
    accessorKey: 'name',
    header: () => (
      <SortableDataTableHeader
        label='Название'
        orderByProperty='name'
        routeId='/layout/category-groups'
      />
    ),
    cell: ({ row }) => <span className='font-medium'>{row.original.name}</span>,
  },
  {
    id: 'Кол-во категорий',
    accessorFn: (row) => row._count?.categories,
    cell: ({ row: { original } }) => {
      return <span className='text-right'>{original._count?.categories}</span>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, isArchived } = row.original

      return <CategoryGroupActions id={id} isArchived={isArchived} />
    },
    enableSorting: false,
    enableHiding: false,
  },
]
