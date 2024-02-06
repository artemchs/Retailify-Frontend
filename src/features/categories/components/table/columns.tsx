import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { Category } from '@/types/entities/Category'
import { ColumnDef } from '@tanstack/react-table'
import CategoryActions from './CategoryActions'

export const columns: ColumnDef<Category>[] = [
  {
    id: 'Название',
    accessorKey: 'name',
    header: () => (
      <SortableDataTableHeader
        label='Название'
        orderByProperty='name'
        routeId='/layout/categories'
      />
    ),
  },
  {
    id: 'Название для товара',
    accessorKey: 'productName',
    header: () => (
      <SortableDataTableHeader
        label='Название для товара'
        orderByProperty='productName'
        routeId='/layout/categories'
      />
    ),
  },
  {
    id: 'Кол-во товаров',
    accessorFn: (row) => row._count?.products,
    cell: ({ row: { original } }) => {
      return <span className='text-right'>{original._count?.products}</span>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, isArchived } = row.original

      return <CategoryActions id={id} isArchived={isArchived} />
    },
    enableSorting: false,
    enableHiding: false,
  },
]
