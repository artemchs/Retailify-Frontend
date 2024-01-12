import SelectCell from '@/components/data-tables/SelectCell'
import SelectHeader from '@/components/data-tables/SelectHeader'
import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { Supplier } from '@/types/entities/Supplier'
import { ColumnDef } from '@tanstack/react-table'
import EditSupplierDialog from '../actions/edit/EditSupplierDialog'
import DeleteSupplierAlertDialog from '../actions/delete/DeleteSupplierAlertDialog'

export const columns: ColumnDef<Supplier>[] = [
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
        routeId='/layout/suppliers'
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
        routeId='/layout/suppliers'
      />
    ),
  },
  {
    id: 'Контактное лицо',
    accessorKey: 'contactPerson',
    header: () => (
      <SortableDataTableHeader
        label='Контактное лицо'
        orderByProperty='contactPerson'
        routeId='/layout/suppliers'
      />
    ),
  },
  {
    id: 'Адрес електронной почты',
    accessorKey: 'email',
    header: () => (
      <SortableDataTableHeader
        label='Адрес електронной почты'
        orderByProperty='email'
        routeId='/layout/suppliers'
      />
    ),
  },
  {
    id: 'Номер телефона',
    accessorKey: 'phone',
    header: () => (
      <SortableDataTableHeader
        label='Номер телефона'
        orderByProperty='phone'
        routeId='/layout/suppliers'
      />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original

      return (
        <div className='flex items-center gap-2 justify-end'>
          <EditSupplierDialog id={id} />
          <DeleteSupplierAlertDialog id={id} />
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]
