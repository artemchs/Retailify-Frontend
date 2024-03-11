import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { Customer } from '@/types/entities/Customer'
import { ColumnDef } from '@tanstack/react-table'
import CustomerActions from './CustomerActions'

export const columns: ColumnDef<Customer>[] = [
  {
    id: 'Имя',
    accessorKey: 'Имя',
    header: () => (
      <SortableDataTableHeader
        label='Имя'
        orderByProperty='firstName'
        routeId='/layout/customers'
      />
    ),
    cell: ({ row }) => (
      <span className='font-medium'>{row.original.firstName}</span>
    ),
  },
  {
    id: 'Фамилия',
    accessorKey: 'Фамилия',
    header: () => (
      <SortableDataTableHeader
        label='Фамилия'
        orderByProperty='lastName'
        routeId='/layout/customers'
      />
    ),
    cell: ({ row }) => (
      <span className='font-medium'>{row.original.lastName}</span>
    ),
  },
  {
    id: 'Электронная почта',
    accessorKey: 'Электронная почта',
    header: () => (
      <SortableDataTableHeader
        label='Электронная почта'
        orderByProperty='email'
        routeId='/layout/customers'
      />
    ),
    cell: ({ row }) => (
      <span className='font-medium'>{row.original.email}</span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original

      return <CustomerActions id={id} />
    },
    enableSorting: false,
    enableHiding: false,
  },
]
