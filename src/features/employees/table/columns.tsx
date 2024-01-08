import { ColumnDef } from '@tanstack/react-table'
import { Employee } from '../types/employee'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getNameShorthand } from '@/utils/getNameShorthand'
import { Badge } from '@/components/ui/badge'
import roleNames from '@/utils/roleNames'
import { Checkbox } from '@/components/ui/checkbox'
import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import EditEmployeeDialog from '../components/edit/EditEmployeeDialog'

export const columns: ColumnDef<Employee>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Выбрать все строки'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Выбрать строку'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'Пользователь',
    accessorKey: 'fullName',
    header: () => (
      <SortableDataTableHeader
        label='Пользователь'
        orderByProperty='fullName'
        routeId='/layout/employees'
      />
    ),
    cell: ({ row }) => {
      const { fullName } = row.original

      return (
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src='' />
            <AvatarFallback>{getNameShorthand(fullName)}</AvatarFallback>
          </Avatar>
          <span className='font-medium'>{fullName}</span>
        </div>
      )
    },
  },
  {
    id: 'Адрес електронной почты',
    accessorKey: 'email',
    header: () => (
      <SortableDataTableHeader
        label='Адрес електронной почты'
        orderByProperty='email'
        routeId='/layout/employees'
      />
    ),
  },
  {
    header: 'Роль',
    cell: ({ row }) => {
      const data = row.original
      const userRole = data.role as keyof typeof roleNames

      return <Badge variant='outline'>{roleNames[userRole]}</Badge>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original

      return (
        <div className='flex items-center gap-2'>
          <EditEmployeeDialog id={id} />
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]
