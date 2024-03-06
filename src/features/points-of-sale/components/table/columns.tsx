import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { PointOfSale } from '@/types/entities/PointOfSale'
import { ColumnDef } from '@tanstack/react-table'
import PointOfSaleActions from './PointOfSaleActions'

export const columns: ColumnDef<PointOfSale>[] = [
  {
    id: 'Название',
    header: () => (
      <SortableDataTableHeader
        label='Название'
        orderByProperty='name'
        routeId='/layout/points-of-sale'
      />
    ),
    cell: ({ row }) => {
      return <span className='font-medium'>{row.original.name}</span>
    },
  },
  {
    id: 'Адрес',
    header: 'Адрес',
    accessorFn: ({ address }) => address,
  },
  {
    id: 'Кассиры',
    header: 'Кассиры',
    cell: ({ row }) => {
      return (
        <p>
          {row.original.cashiers.map(({ fullName }) => fullName).join(', ')}
        </p>
      )
    },
  },
  {
    id: 'Теги товара',
    header: 'Теги товара',
    cell: ({ row }) => {
      return (
        <p>{row.original.productTags.map(({ name }) => name).join(', ')}</p>
      )
    },
  },
  {
    id: 'Группы категорий',
    header: 'Группы категорий',
    cell: ({ row }) => {
      return (
        <p>{row.original.categoryGroups.map(({ name }) => name).join(', ')}</p>
      )
    },
  },

  {
    id: 'Категории',
    header: 'Категории',
    cell: ({ row }) => {
      return <p>{row.original.categories.map(({ name }) => name).join(', ')}</p>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, isArchived } = row.original

      return <PointOfSaleActions id={id} isArchived={isArchived} />
    },
    enableSorting: false,
    enableHiding: false,
  },
]
